import { CreatedLetterEvent } from "core/letter/domain/events/actions/created/created-letter.event";
import { LetterRepository } from "core/letter/domain/port/repositories/prisma/letter.repository";
import { PrismaAdapter } from "shared/infra/database/prisma/adapter";

export class LetterRepositoryImpl implements LetterRepository {
    constructor(private readonly adapter : PrismaAdapter) {

    }

    async getHistory(userId: string){
        // return this.adapter.letter.findMany({
        //     where: {
        //         client :{
        //             userId: userId
        //         }
        //     }
        // })
    }

    async push(event$){
        if(event$ instanceof CreatedLetterEvent) {
        // this.adapter.letter.create({
        //     data: {}
        // });
    }else {
        // this.adapter.letter.update()
    }

    }
}