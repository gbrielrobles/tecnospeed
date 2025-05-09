import { Injectable } from "@nestjs/common";
import { CreatedLetterEvent } from "core/letter/domain/events/actions/created/created-letter.event";
import { UpdatedLetterEvent } from "core/letter/domain/events/actions/updated/updated-letter.event";
import { LetterRepository } from "core/letter/domain/port/repositories/prisma/letter.repository";
import { PrismaAdapter } from "shared/infra/database/prisma/adapter";

@Injectable()
export class LetterRepositoryImpl implements LetterRepository {
    constructor(private readonly prisma : PrismaAdapter) {}

    async getHistory(userId: string){
        return await this.prisma.letter.findMany({
            where: {
              userId: userId
            }
        })
    }

    async push(event$ : CreatedLetterEvent | UpdatedLetterEvent){
        if(event$ instanceof CreatedLetterEvent) {
        await this.prisma.letter.create({
            data: {
                ...event$.data, 
                status: event$.data.status as any,
            }
        });
    }else {
        await this.prisma.letter.update({
            where: {
                id: event$.data.bankId
            },
            data: {
                ...event$.data,
                status: event$.data.status as any
            }
        })
    }

    }
}