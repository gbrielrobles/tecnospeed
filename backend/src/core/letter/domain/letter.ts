import { generateId } from "utils/generate-id";
import { LetterSendingRequest } from "../infra/http/action/sending/request";
import { SendingLetterStatus } from "./enum/status-letter";
import { IsArray, IsDate, IsEnum, isEnum, IsString } from "class-validator";
import { classToPlain, Expose, plainToClass, plainToInstance, Type } from "class-transformer";
import { Domain } from "utils/domain";
import { Carrier } from "./enum/carrier";

export class ILetter { 
    id: string;
    clientId: string;
    letter: string;
    carrier: Carrier
    bankId: string; 
    status: SendingLetterStatus;
    ticket: string;
    createdAt: Date;
    updatedAt: Date;
}


export class Letter {
    @Expose()
    @IsString()
    id: string;

    @Expose()
    @IsString()
    clientId: string;

    @Expose()
    @IsArray()
    @IsString()
    letter: string;
      
    @Expose()
    @IsEnum(Carrier)
    carrier: Carrier

    @Expose()
    @IsString()
    bankId: string; 

    @Expose()
    @IsEnum(SendingLetterStatus)
    status: SendingLetterStatus;

    @Expose()
    @IsString()
    ticket: string | null;

    @Expose()
    @IsDate()
    @Type(() => Date)
    createdAt: Date;

    @Expose()
    @IsDate()
    @Type(() => Date)
    updatedAt: Date;

}