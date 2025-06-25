import { Injectable } from "@nestjs/common";
import { SendingLetterStatus } from "core/letter/domain/enum/status-letter";
import { Letter } from "core/letter/domain/letter";
import { LetterRepository } from "core/letter/domain/port/repositories/prisma/letter.repository";
import { PrismaAdapter } from "shared/infra/database/prisma/adapter";
import { ZapierMappedResult } from "../zapier/mapper/zapier";
import { StatusOfSending } from "@prisma/client";

@Injectable()
export class LetterRepositoryImpl implements LetterRepository {
    constructor(private readonly prisma : PrismaAdapter) {}
    
    async updateStatus(status: SendingLetterStatus, data: {
            letterId: string;
            responseAPI: ZapierMappedResult
    }): Promise<void> {
        await this.prisma.$transaction(async tsx => {
            await tsx.letterLogs.create({
                data: {
                    attempt: data.responseAPI.attempt,
                    requestId: data.responseAPI.requestId,
                    status: data.responseAPI.status,
                    letterId: data.letterId
                }
            });
            await tsx.letter.update({
                where: {
                    id: data.letterId
                },
                data: {
                    status: status as StatusOfSending
                }
            });
        });
    }

    async getHistory(id: string){
        return await this.prisma.letter.findMany({
            where: {
              clientId: id
            }
        })
    }

    async push(event$ : Letter) : Promise<string> {
        const { id, ...rest } = event$; 
        const result = await this.prisma.$transaction(async (tsx) => {
            const result = await tsx.letter.upsert({
                create: {
                    letter: rest.letter,
                    carrier: rest.carrier,
                    status: rest.status as any,
                    ticket: rest.ticket,
                    clientId: rest.clientId,
                    createdAt: rest.createdAt,
                    updatedAt: rest.updatedAt,
                    base64letter: rest.base64letter as string,
                    id: id
                },
                update: {
                    status: rest.status as any,
                },
                where : {
                    id: id
                }
            }); 

            await tsx.letter.update({
                where: {
                    id: result.id
                },
                data: {
                    status: StatusOfSending.SENDING
                }
            });
            
            return result;
        }) 

        return result.id;
    }
}