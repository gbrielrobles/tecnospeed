import { Injectable } from "@nestjs/common";
import { ContractNotFoundException } from "core/letter/domain/exceptions/contract-not-fount";
import { FormLetter } from "core/letter/domain/form-letter";
import { CachedLetterRepository } from "core/letter/domain/port/repositories/cached/repository";
import { StrategyTemplateBuild } from "../../strategy/template-strategy";
import { LetterProducerQueue } from "core/letter/infra/bull/producer";

@Injectable()
export class SendingLetterUsecase {
    constructor(
        private readonly cache: CachedLetterRepository,
        private readonly queue: LetterProducerQueue
    ) {}

    async execute(hashed: string): Promise<any> {
        const result = await this.cache.get(hashed);

        if(!result) {
            throw new ContractNotFoundException()
        }

        const data = FormLetter.buildPlain(JSON.parse(result));
          
        const productsToSending = data.bank.products.filter((prod) => prod.selected == true);

        productsToSending.forEach(prod => {
            const html = StrategyTemplateBuild.getHtml(data.bank.id, {
                ...data, 
                bank: {
                    ...data.bank,
                    products: [prod],
                }
           }, data.carrier)

           
        });
        
        await this.queue.publish(contractToSending, {
            cnpj: data.client.cnpj,
            email: data.client.companyContact.email,
            product: data.bank.products
        });
    }
}