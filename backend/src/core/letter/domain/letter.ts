import { generatorId } from "utils/generator-id";
import { LetterSendingRequest } from "../infra/http/sending/request";
import { SendingLetterStatus } from "./enum/status-letter";
import { IsDate, IsEnum, isEnum, IsString } from "class-validator";
import { classToPlain, Expose, plainToClass, plainToInstance, Type } from "class-transformer";
import { Domain } from "utils/domain";

export class Letter {
    @Expose()
    @IsString()
    id: string;

    @Expose()
    @IsString()
    userId: string;

    @Expose()
    @IsString()
    nexera: string;

    @Expose()
    @IsString()
    bankId: string; 

    @Expose()
    @IsString()
    productId: string;

    @Expose()
    @IsString()
    finnet: string;

    @Expose()
    @IsEnum(SendingLetterStatus)
    status: SendingLetterStatus;

    @Expose()
    @IsString()
    ticket: string;

    @Expose()
    @IsDate()
    @Type(() => Date)
    createdAt: Date;

    @Expose()
    @IsDate()
    @Type(() => Date)
    updatedAt: Date;

    static fromPlain(plain) {
        return Domain.new(this, plain);
    }

    async create(data: Omit<Letter, 'id' | 'createdAt' | 'updatedAt'>) : Promise<Letter> {
        return await Letter.fromPlain({
            ...data,
            id: generatorId(),
            createdAt: new Date(),
            updatedAt: new Date()
        });
    }

    async update(data: Omit<Letter, 'createdAt'>)  {
        return await Letter.fromPlain({
            ...data,
            update: new Date()
        })
    } 

}