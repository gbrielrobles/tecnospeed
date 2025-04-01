import { Injectable } from "@nestjs/common";
import { Bank } from "../../domain/bank";
import { BankRepository } from "../../domain/port/repositories/bank.repository";

@Injectable()
export class GetBankUsecase {
    constructor(private readonly repository : BankRepository) {}

    async execute(id: string): Promise<Bank> {
        return await this.repository.findById(id) ;
    }
}