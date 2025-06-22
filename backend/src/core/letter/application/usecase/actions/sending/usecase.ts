import { Injectable } from "@nestjs/common";
import { ContractNotFoundException } from "core/letter/domain/exceptions/contract-not-fount";
import { FormLetter } from "core/letter/domain/form-letter";
import { CachedLetterRepository } from "core/letter/domain/port/repositories/cached/repository";
import { StrategyTemplateBuild } from "../../../strategy/template-strategy";
import { LetterProducerQueue } from "core/letter/infra/bull/producer";
import { LetterRepository } from "core/letter/domain/port/repositories/prisma/letter.repository";
import { SendingLetterStatus } from "core/letter/domain/enum/status-letter";
import { generateId } from "utils/generate-id";

@Injectable()
export class SendingLetterUsecase {
    constructor(
        private readonly cache: CachedLetterRepository,
        private readonly queue: LetterProducerQueue,
        private readonly strategy: StrategyTemplateBuild,
        private readonly letterRepository: LetterRepository
    ) {}

    async execute(hashed: string): Promise<any> {
        const cache = await this.cache.get(hashed);

        if(!cache) {
            throw new ContractNotFoundException()
        }

        const data = FormLetter.create(JSON.parse(cache));

        const productsToSending = data.bank.products.filter((prod) => prod.selected == true);
        console.log(productsToSending);
        productsToSending.forEach(async prod => {
            const html = await this.strategy.getHtml(data.bank.id, {
                ...data,
                bank: {
                    ...data.bank,
                    products: [prod],
                }
            }, data.carrier);

            const result : string = await this.letterRepository.push({
                bankId: data.bank.id,
                carrier: data.carrier,
                createdAt: new Date(),
                updatedAt: new Date(),
                status: SendingLetterStatus.PENDING,
                id: generateId(),
                ticket: null,
                letter: cache,
                clientId: "cmbk78ynb000007lbabwkfokt",
            });

            const letterId = result;

            const pdf = await this.strategy.getPdf({
                ...data, 
                bank: {
                    ...data.bank,
                    products: [prod],
                }
            }, data.carrier)

            await this.queue.publish(pdf, letterId, {
                cnpj: data.client.cnpj,
                email: data.client.companyContact.email,
                product: prod.description
            });
        });
        
      
       
    }
}