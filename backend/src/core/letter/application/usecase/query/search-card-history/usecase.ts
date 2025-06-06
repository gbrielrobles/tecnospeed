import { LetterRepository } from "core/letter/domain/port/repositories/prisma/letter.repository";
import { SearchCardHistoryInput } from "./input";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SearchCardHistoryUsecase {
    constructor(private readonly repository: LetterRepository){}

    async execute(input: SearchCardHistoryInput) {
        return this.repository.getHistory(input.clientId) ?? [];
    }
}