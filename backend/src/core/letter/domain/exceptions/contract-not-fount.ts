import { HttpException, HttpStatus } from '@nestjs/common';

export class ContractNotFoundException extends HttpException {
  constructor() {
    super(`Contract notfound`, HttpStatus.NOT_FOUND);
  }
}
