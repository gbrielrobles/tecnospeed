import { IsString } from "class-validator";
import { SendingLetterInput } from "core/letter/application/usecase/sending/input";

export class LetterSendingRequest {
    @IsString()
    bankId: string;

    @IsString()
    hashed: string;

    toInput() : SendingLetterInput {
        return {
            bankId: this.bankId,
            hashed: this.hashed
        }
    }
}