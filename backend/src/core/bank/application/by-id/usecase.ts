import { Injectable } from "@nestjs/common";
import { Bank } from "../../domain/bank";
import { BankRepository } from "../../domain/port/repositories/bank.repository";
import { GetBankByIdOutput } from "./output";

@Injectable()
export class GetBankUsecase {
    constructor(private readonly repository : BankRepository) {}

    async execute(id: string): Promise<GetBankByIdOutput> {
        return await this.repository.findById(id) ;
    }
}