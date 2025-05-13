import { Injectable } from "@nestjs/common";
import { GetLetterInput } from "./input";
import { BankRepository } from "core/bank/domain/port/repositories/bank.repository";
import { CachedLetterRepository } from "core/letter/domain/port/repositories/cached/repository";
import { BuildLetterTemplate } from "../../services/build-template/services";
import { PREFERENCES_CONTACT } from "core/letter/domain/enum/preferences-contact.enum";
import { BankNotFoundException } from "core/bank/domain/exceptions/bank-notfound.exception";
import { required } from "utils/required";
import { FormLetter } from "core/letter/domain/form-letter";

@Injectable()
export class GetLetterUseCase {
    constructor(
        private readonly bankRepository: BankRepository,
        private readonly cached: CachedLetterRepository,
        private readonly build: BuildLetterTemplate,
    ) { }
    
    async execute(input: GetLetterInput){
        const result = await this.bankRepository.findById(input.bank.bankId);
    
        if(!result) throw new BankNotFoundException()

        const data = Object.assign(result, input)
        const instanceLetter = FormLetter.buildPlain(data);
        const letter = this.build.createLetter(instanceLetter);
        await this.cached.set(letter.hashed, JSON.stringify(data));
        return letter;
    }
}