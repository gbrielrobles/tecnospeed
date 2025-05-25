import { Controller, Get, Param } from '@nestjs/common';
import { GetByIdBankUsecase } from 'core/bank/application/by-id/usecase';
import { GetByIdBankResponse } from './response';
import { plainToInstance } from 'class-transformer';

@Controller('bank')
export class GetByIdBankController {
  constructor(private readonly usecase: GetByIdBankUsecase) {}

  @Get(':id')
  async getById(@Param('id') id: string): Promise<GetByIdBankResponse> {
    const result = await this.usecase.execute(id)
    return plainToInstance(GetByIdBankResponse, result, {excludeExtraneousValues: true});
  }
}
