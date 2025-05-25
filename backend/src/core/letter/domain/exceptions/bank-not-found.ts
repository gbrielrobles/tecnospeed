import { HttpException, HttpStatus } from '@nestjs/common';

export class BankNotFoundException extends HttpException {
  constructor() {
    super(`Bank notfound`, HttpStatus.NOT_FOUND);
  }
}
