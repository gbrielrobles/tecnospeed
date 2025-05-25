import { Injectable } from '@nestjs/common';
import { BankRepository } from '../../domain/port/repositories/bank.repository';
import { GetAllBankOutput } from './output';

@Injectable()
export class GetAllBankUseCase {
  constructor(private readonly repository: BankRepository) {}

  async execute(): Promise<GetAllBankOutput[]> {
    return await this.repository.findAll();
  }
}
