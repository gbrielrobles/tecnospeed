import { IsString } from "class-validator";

export class LetterSendingRequest {
    @IsString()
    hashed: string;

    toInput() : string {
        return this.hashed
    }
}