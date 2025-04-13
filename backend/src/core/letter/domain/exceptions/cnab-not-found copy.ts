import { HttpException, HttpStatus } from '@nestjs/common';

export class CnabNotFoundException extends HttpException {
  constructor() {
    super(`Cnab notfound`, HttpStatus.NOT_FOUND);
  }
}
