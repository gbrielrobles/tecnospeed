import { Controller, Get } from '@nestjs/common';
import { GetAllBankUseCase } from 'core/bank/application/get-all/usecase';

@Controller('bank')
export class GetAllBankController {
  constructor(private readonly usecase: GetAllBankUseCase) {}

  @Get()
  getAll() {
    return this.usecase.execute();
  }
}
