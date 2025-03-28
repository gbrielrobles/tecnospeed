import { Injectable } from "@nestjs/common";
import { Bank } from "../../domain/bank";

@Injectable ()
export class GetAllBankUseCase {
    constructor() {}

    async execute() : Bank[] {
        return Bank
    }

}