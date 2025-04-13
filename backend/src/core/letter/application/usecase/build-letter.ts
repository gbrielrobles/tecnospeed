import { Injectable } from "@nestjs/common";
import { BuildLetterInput } from "./input";
import { FactoryLetter } from "core/letter/factory/confirm/letter";
import { BankRepository } from "core/bank/domain/port/repositories/bank.repository";
import { ProductNotFoundException } from "core/letter/domain/exceptions/product-not-found";

@Injectable()
export class BuildLetterUseCase {
    constructor(private readonly bankRepository: BankRepository) { }
    
    async execute(input: BuildLetterInput) {
        const bank = await this.bankRepository.findById(input.bankId)
        for (const id of input.selectedProducts) {
            const productFound = bank.products.find(p => p.id == id) 
            if(!productFound ){
                throw new ProductNotFoundException();
            }
        }

        return FactoryLetter.build({
            bank: {
                code: bank.code,
                name: bank.name
            },
            client: {
                accountNumber: input.accountNumber,
                branchNumber: input.branchNumber,
                cnpj: input.cnpj,
                legalName: input.legalName
            },
            product: input.selectedProducts.map(p => {
                return {
                    id: p
                }
            })
        })
    }
}