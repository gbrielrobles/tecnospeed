import { CreatedLetterEvent } from "core/letter/domain/events/actions/created/created-letter.event";
import { UpdatedLetterEvent } from "core/letter/domain/events/actions/updated/updated-letter.event";
import { PrismaAdapter } from "shared/infra/database/prisma/adapter";

export abstract class LetterRepository {
    abstract getHistory(userId: string);
    abstract push(event$: CreatedLetterEvent | UpdatedLetterEvent);
}