import { SendingLetterInput } from "./input";
import { Injectable } from "@nestjs/common";
import { CachedLetterRepository } from "core/letter/domain/port/repositories/cached/repository";

@Injectable()
export class SendingLetterUsecase {
    constructor(
        private readonly letterRepository: CachedLetterRepository,
    ) {}

    async execute(input: SendingLetterInput): Promise<void> {
        const { bankId, hashed } = input;
        const contractToSending = await this.letterRepository.get(hashed);

        if (!contractToSending) {
            throw new Error("Contract not found");
        }
    }
}