import { Letter } from "core/letter/domain/letter";

export abstract class LetterRepository {
    abstract getHistory(userId: string);
    abstract push(event$: Letter);
}