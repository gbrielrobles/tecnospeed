import { Module } from '@nestjs/common';
import { BankRepository } from './core/bank/domain/port/repositories/bank.repository';
import { BankRepositoryImpl } from './core/bank/infra/database/repositories/bank/bank.repository';
import { SharedModule } from 'shared/shared.module';
import { BankModule } from 'core/bank/bank.module';
import { LetterModule } from 'core/letter/letter.module';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    SharedModule,
    BankModule,
    LetterModule,
    PrometheusModule.register({
      path: '/metrics',
    })
  ],
})
export class AppModule {}
