import { Letter } from "@prisma/client";

export abstract class LetterRepository {
    abstract getHistory(userId: string);
    abstract push(event$: Letter);
}