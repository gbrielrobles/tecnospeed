import { Injectable } from "@nestjs/common";
import { Letter } from "core/letter/domain/letter";
import { LetterRepository } from "core/letter/domain/port/repositories/prisma/letter.repository";
import { PrismaAdapter } from "shared/infra/database/prisma/adapter";

@Injectable()
export class LetterRepositoryImpl implements LetterRepository {
    constructor(private readonly prisma : PrismaAdapter) {}

    async getHistory(id: string){
        return await this.prisma.letter.findMany({
            where: {
              clientId: id
            }
        })
    }

    async push(event$ : Letter){
        const {id ,...rest} = event$; 
        await this.prisma.letter.upsert({
            create: {
                ...rest, 
                status: rest.status as any
            },
            update: {
                ...rest,
                status: rest.status as any
            },
             where : {
                id: id
             }
        });

    }
}