import { SendingLetterStatus } from "core/letter/domain/enum/status-letter";
import { Letter } from "core/letter/domain/letter";
import { ZapierMappedResult } from "core/letter/infra/zapier/mapper/zapier";

export abstract class LetterRepository {
    abstract updateStatus(status: SendingLetterStatus, data: {
        letterId: string;
        responseAPI: ZapierMappedResult
    }); 
    abstract getHistory(userId: string);
    abstract push(event$: Letter);
}