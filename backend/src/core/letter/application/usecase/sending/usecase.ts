import { SendingLetterInput } from "./input";
import { Injectable } from "@nestjs/common";
import { ContractNotFoundException } from "core/letter/domain/exceptions/contract-not-fount";
import { FormLetter } from "core/letter/domain/form-letter";
import { CachedLetterRepository } from "core/letter/domain/port/repositories/cached/repository";
import { LetterRepository } from "core/letter/domain/port/repositories/prisma/letter.repository";
import { required } from "utils/required";

@Injectable()
export class SendingLetterUsecase {
    constructor(
        private readonly cache: CachedLetterRepository,
        private readonly repository: LetterRepository
    ) {}

    async execute(input: SendingLetterInput): Promise<void> {
        const { bankId, hashed } = input;
        const result = await this.cache.get(hashed);

        if(!result) {
            throw new ContractNotFoundException()
        }

        const contractToSending = JSON.parse(result);
        
        const data = FormLetter.toBuild(contractToSending);
        console.log(data);
    }
}