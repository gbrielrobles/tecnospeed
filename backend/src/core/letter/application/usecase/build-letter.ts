import { Injectable } from "@nestjs/common";
import { BuildLetterInput } from "./input";
import { FactoryLetter } from "core/letter/factory/confirm/letter";
import { BankRepository } from "core/bank/domain/port/repositories/bank.repository";
import { ProductNotFoundException } from "core/letter/domain/exceptions/product-not-found";
import { Bank } from "core/letter/domain/letter";
import { plainToInstance } from "class-transformer";
import { CnabNotFoundException } from "core/letter/domain/exceptions/cnab-not-found copy";

@Injectable()
export class BuildLetterUseCase {
    constructor(private readonly bankRepository: BankRepository) { }
    
    async execute(input: BuildLetterInput) {
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

        return FactoryLetter.build({
            bank: {
                cnabs: bank.cnabs,
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
                legalName: input.legalName
            }
        })
    }
}