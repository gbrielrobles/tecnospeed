import { Injectable } from '@nestjs/common';
import { BankRepository } from '../../domain/port/repositories/bank.repository';
import { GetBankByIdOutput } from './output';
import { BankNotFoundException } from '../../domain/exceptions/bank-notfound.exception';
import { CnabNotResgitredException } from '../../domain/exceptions/cnab-notregistred.exception';
import { plainToInstance } from 'class-transformer';
import { required } from 'utils/required';



@Injectable()
export class GetByIdBankUsecase {
  constructor(private readonly repository: BankRepository) {}

  async execute(id: string): Promise<GetBankByIdOutput> {
    const result = plainToInstance(
      GetBankByIdOutput,
      await this.repository.findById(id),
    );

    required(result, () => new BankNotFoundException());

    return result;
  }
}
