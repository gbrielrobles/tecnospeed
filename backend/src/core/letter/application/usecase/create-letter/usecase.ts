import { Injectable } from "@nestjs/common";
import { CreateLetterInput } from "./input";
import { BankRepository } from "core/bank/domain/port/repositories/bank.repository";
import { CachedLetterRepository } from "core/letter/domain/port/repositories/cached/repository";
import { BankNotFoundException } from "core/bank/domain/exceptions/bank-notfound.exception";
import { FormLetter } from "core/letter/domain/form-letter";
import { generateHash } from "utils/generate-hash";
import { StrategyTemplateBuild } from "../../strategy/template-strategy";

@Injectable()
export class CreateLetterUseCase {
    constructor(
        private readonly bankRepository: BankRepository,
        private readonly cached: CachedLetterRepository,
    ) { }
    
    async execute(input: CreateLetterInput) {
        const result = await this.bankRepository.findById(input.bank.bankId);
        if(!result) throw new BankNotFoundException()
        const data = Object.assign(result, input)
        const instanceLetter = FormLetter.buildPlain(data);
        const template = StrategyTemplateBuild.getHtml(instanceLetter.bank.id, instanceLetter, input.carrier)
        const hashed = generateHash(template);
        await this.cached.set(hashed, data);
        return {
            template,
            hashed
        };
    }
}