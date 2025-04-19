import { Injectable } from "@nestjs/common";
import { GetLetterInput } from "./input";
import { BankRepository } from "core/bank/domain/port/repositories/bank.repository";
import { ProductNotFoundException } from "core/letter/domain/exceptions/product-not-found";
import { Bank, Letter } from "core/letter/domain/letter";
import { plainToInstance } from "class-transformer";
import { CnabNotFoundException } from "core/letter/domain/exceptions/cnab-not-found copy";
import { CachedLetterRepository } from "core/letter/domain/port/repositories/cached/repository";
import {  TemplateFacade } from "../../facade/template";
import { BuildLetterTemplate } from "../../services/build-template/services";
import { LetterDto } from "../../services/build-template/dto/Letter";
import { PREFERENCES_CONTACT } from "core/letter/domain/enum/preferences-contact.enum";

@Injectable()
export class GetLetterUseCase {
    constructor(
        private readonly bankRepository: BankRepository,
        private readonly cached: CachedLetterRepository,
        private readonly build: BuildLetterTemplate
    ) { }
    
    async execute(input: GetLetterInput){
        const result = await this.bankRepository.findById(input.bank.bankId);
       
        if (!result) throw new Error()
       
        const letter = this.build.createLetter(
            {
                bank: {
                    id: result.id,
                    bankContactManager: input.bank.bankManagerContact,
                    code: result.code,
                    name: result.name,
                    ufBank: input.bank.ufBank,
                    bankCity: input.bank.bankCity,
                    products: result.products.map(p => {
                        return {
                            id: p.id,
                            description: p.description,
                            name: p.name,
                            selected: input.bank.selectedProducts.includes(p.id)
                        }
                    }),
                    cnabs: result.cnabs.map(cnab => {
                        return {
                            name: cnab,
                            selected: input.bank.selectedCnabs.includes(cnab)
                        }
                    })
                },
                client: {
                    accountNumber: input.bank.accountNumber,
                    agreement: input.agreement,
                    branchNumber: input.bank.branchNumber,
                    cnpj: input.cnpj,
                    companyContact: input.companyContact,
                    legalName: input.legalName,
                    preferenceByContact: Object.entries(PREFERENCES_CONTACT).map(([key, value])=> {
                        return {
                            description: key,
                            selected: input.preferenceByContact.includes(value as PREFERENCES_CONTACT),
                        }
                    })
                }
            }
        );
       
        if (input.hashed) {
            this.cached.get(input.hashed);
            return {
                data: 'ok'
            };
        }

        this.cached.set(letter.hashed, JSON.stringify(letter.data))
        return letter.data.finnet;
    }
}