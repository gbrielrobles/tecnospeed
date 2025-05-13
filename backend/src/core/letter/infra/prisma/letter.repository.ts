import { Injectable } from "@nestjs/common";
import { Letter } from "@prisma/client";
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

    async push(event$ : Letter){
        const {id ,...rest} = event$; 
        await this.prisma.letter.upsert({
            create: {
                ...rest, 
                status: event$.status
            },
            update: {
                ...rest,
            },
             where : {
                id: id
             }
        });

    }
}