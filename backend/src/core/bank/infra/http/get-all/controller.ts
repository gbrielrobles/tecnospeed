import { Controller, Get } from '@nestjs/common';
import { GetAllBankUseCase } from 'core/bank/application/get-all/usecase';
import { GetAllBankResponse } from './response';
import { plainToInstance } from 'class-transformer';

@Controller('bank')
export class GetAllBankController {
  constructor(private readonly usecase: GetAllBankUseCase) {}

  @Get()
  async getAll() : Promise<GetAllBankResponse> {
    const result = this.usecase.execute();
    return await plainToInstance(GetAllBankResponse, result, {excludeExtraneousValues: true});
  }
}
