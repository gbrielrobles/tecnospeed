import { Injectable } from "@nestjs/common";
import { BuildLetterInput } from "./input";
import { FactoryLetter } from "core/letter/factory/confirm/letter";
import { BankRepository } from "core/bank/domain/port/repositories/bank.repository";
import { ProductNotFoundException } from "core/letter/domain/exceptions/product-not-found";
import { Bank } from "core/letter/domain/letter";
import { plainToInstance } from "class-transformer";
import { CnabNotFoundException } from "core/letter/domain/exceptions/cnab-not-found copy";
import { CachedLetterRepository } from "core/letter/domain/port/repositories/cached/repository";
import { BuildLetterOutput } from "./output";

@Injectable()
export class BuildLetterUseCase {
    constructor(
        private readonly bankRepository: BankRepository,
        private readonly cached: CachedLetterRepository
    ) { }
    
    async execute(input: BuildLetterInput) : Promise<BuildLetterOutput>{
        const result = await this.bankRepository.findById(input.bankId);
        if (!result) throw new Error()
        
        const bank: Bank = plainToInstance(
            Bank,
            {
                code: result.code,
                name: result.name,
                products: result.products.map(p => {
                    return {
                        id: p.id,
                        description: p.description,
                        name: p.name,
                        selected: false
                    }
                }),
                cnabs: result.cnabs.map(cnab => {
                    return {
                        name: cnab,
                        selected: false
                    }
                })
            }
        );
        
        for (const id of input.selectedProducts) {
            const productFound = bank.products.find(p => p.id == id) 

            if(!productFound ){
                throw new ProductNotFoundException();
            }

            productFound.selected = true;
        };

        for (const cnab of input.selectedCnabs) {
            const cnabFound = bank.cnabs.find(c => c.name == cnab);
            if(!cnabFound ){
                throw new CnabNotFoundException();
            }

            cnabFound.selected = true;
        }

        const letter = FactoryLetter.build({
            bank: {
                cnabs: bank.cnabs,
                bankContactManager: input.bankManagerContact,
                code: bank.code,
                name: bank.name,
                products: bank.products.map(p => {
                    return {
                        name: p.name,
                        description: p.description,
                        selected: p.selected,
                        id: p.id
                    }
                })
            },
            client: {
                accountNumber: input.accountNumber,
                branchNumber: input.branchNumber,
                cnpj: input.cnpj,
                legalName: input.legalName,
                companyContact: input.companyContact,
                agreement: input.agreement
            }
        })

        if (input.hashedHtml) {
            this.cached.get(input.hashedHtml);
            return {
                data: ''
            };
        }

        this.cached.set(letter.hashed, letter.data)
        return letter;
    }
}