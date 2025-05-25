import { Injectable } from '@nestjs/common';
import { BankModel, BankModelWithProducts } from './models/bank.model';
import { plainToInstance } from 'class-transformer';
import { BankRepository } from 'core/bank/domain/port/repositories/bank.repository';
import { PrismaAdapter } from 'shared/infra/database/prisma/adapter';

@Injectable()
export class BankRepositoryImpl implements BankRepository {
  constructor(private readonly prisma: PrismaAdapter) {}

  async findAll(): Promise<BankModel[]> {
    const result = await this.prisma.bank.findMany();
    return (
      result.map((bank): BankModel => plainToInstance(BankModel, bank)) ?? []
    );
  }

  async findById(id: string): Promise<BankModelWithProducts | null> {
    const result = await this.prisma.bank.findFirst({
      where: { id: id },
      include: {
        ProductByBank: {
          include: { product: true },
        },
      },
    });
    return (
      result ?
        plainToInstance(BankModelWithProducts, {
          ...result,
          products: result.ProductByBank.map((p) => ({
            id: p.product.id,
            name: p.product.name,
            description: p.product.description,
          })),
        }) : null
    );
  }
}
