import { Module } from '@nestjs/common';
import { GetAllBankController } from './core/bank/infra/http/get-all/controller';
import { GetByIdBankUsecase } from './core/bank/application/by-id/usecase';
import { GetAllBankUseCase } from './core/bank/application/get-all/usecase';
import { BankRepository } from './core/bank/domain/port/repositories/bank.repository';
import { BankRepositoryImpl } from './core/bank/infra/database/repositories/bank/bank.repository';
import { PrismaAdapter } from './core/bank/infra/database/prisma/adapter';
import { GetByIdBankController } from './core/bank/infra/http/by-id/controller';

@Module({
  imports: [],
  controllers: [GetAllBankController, GetByIdBankController],
  providers: [
    PrismaAdapter,
    GetAllBankUseCase,
    GetByIdBankUsecase,
    {
      provide: BankRepository,
      useClass: BankRepositoryImpl,
    },
  ],
})
export class AppModule {}
