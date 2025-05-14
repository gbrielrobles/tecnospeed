import { SendingLetterInput } from "./input";
import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { ContractNotFoundException } from "core/letter/domain/exceptions/contract-not-fount";
import { FormLetter } from "core/letter/domain/form-letter";
import { CachedLetterRepository } from "core/letter/domain/port/repositories/cached/repository";
import { LetterRepository } from "core/letter/domain/port/repositories/prisma/letter.repository";
import { required } from "utils/required";
import { BuildLetterTemplate } from "../../services/build-template/services";

@Injectable()
export class SendingLetterUsecase {
    constructor(
        private readonly cache: CachedLetterRepository,
        private readonly build: BuildLetterTemplate
    ) {}

    async execute(input: SendingLetterInput): Promise<any> {
        const { bankId, hashed } = input;
        const result = await this.cache.get(hashed);

        if(!result) {
            throw new ContractNotFoundException()
        }

        const data = FormLetter.buildPlain(JSON.parse(result));
        const productsToSending = data.bank.products.filter((prod) => prod.selected == true);

        const contractToSending = productsToSending.map(prod => {
            return this.build.createLetter({
                ...data,
                bank: {
                    bankContactManager: data.bank.bankContactManager,
                    products: [prod],
                    cnabs: data.bank.cnabs,
                    code:data.bank.code,
                    id: data.bank.id,
                    name: data.bank.name
                }
            })
        });
        
        return contractToSending;
    }
}