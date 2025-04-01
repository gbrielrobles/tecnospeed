import { Injectable } from "@nestjs/common";
import { PrismaAdapter } from "../../prisma/adapter";
import { BankModel } from "./models/bank.model";
import { BankRepository } from "src/core/bank/domain/port/repositories/bank.repository";
import { plainToInstance } from "class-transformer";

@Injectable()
export class BankRepositoryImpl implements BankRepository {
    constructor(private readonly prisma: PrismaAdapter) {}
    
    async findAll(): Promise<BankModel[]> {
        const result = await this.prisma.bank.findMany();
        return result.map((bank) => plainToInstance(BankModel, {
            id: bank.id,
            name: bank.name,
            createdAt: bank.createdAt,
            updatedAt: bank.updatedAt
        })) ?? [];
    }
    
    async findById(id: string): Promise<BankModel> {
        return plainToInstance(BankModel, await this.prisma.bank.findUnique({ where: { id } }));
    }
}