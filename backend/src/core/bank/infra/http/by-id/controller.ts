import { Controller, Get, Param } from '@nestjs/common';
import { GetByIdBankUsecase } from 'core/bank/application/by-id/usecase';

@Controller('bank')
export class GetByIdBankController {
  constructor(private readonly usecase: GetByIdBankUsecase) {}

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.usecase.execute(id);
  }
}
