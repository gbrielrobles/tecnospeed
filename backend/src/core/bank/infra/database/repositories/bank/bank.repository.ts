import { Injectable } from "@nestjs/common";
import { PrismaAdapter } from "../../prisma/adapter";
import { BankModel, BankModelWithProducts } from "./models/bank.model";
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
            code: bank.code,
            createdAt: bank.createdAt,
            updatedAt: bank.updatedAt
        })) ?? [];
    }
    
    async findById(id: string): Promise<BankModelWithProducts> {
        const result =   await this.prisma.bank.findFirst({
            where: { id :id},
            include: {  ProductByBank: {
                include: { product: true } 
            } }
        }) 

        if (!result) {
            throw new Error("Bank not found");
        }

        return plainToInstance(BankModelWithProducts, {
            cnab: result.cnabs,
            id: result.id, 
            name: result.name,
            code: result.code,
            products: result.ProductByBank.map((p) => ({
                id: p.product.id,
                name: p.product.name,
                description: p.product.description
            }))
        }) ?? null
    }
}