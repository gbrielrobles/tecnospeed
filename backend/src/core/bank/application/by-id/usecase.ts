import { Injectable } from '@nestjs/common';
import { BankRepository } from '../../domain/port/repositories/bank.repository';
import { GetBankByIdOutput } from './output';
import { required } from 'src/utils/required';
import { BankNotFoundException } from '../../domain/exceptions/bank-notfound.exception';
import { have } from 'src/utils/have';
import { CnabNotResgitredException } from '../../domain/exceptions/cnab-notregistred.exception';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class GetByIdBankUsecase {
  constructor(private readonly repository: BankRepository) {}

  async execute(id: string): Promise<GetBankByIdOutput> {
    const result = plainToInstance(
      GetBankByIdOutput,
      await this.repository.findById(id),
    );

    required(result, () => new BankNotFoundException());

    result.cnab = have(
      JSON.parse(result.cnab as unknown as string) as string[],
      () => new CnabNotResgitredException(),
    );

    return result;
  }
}
