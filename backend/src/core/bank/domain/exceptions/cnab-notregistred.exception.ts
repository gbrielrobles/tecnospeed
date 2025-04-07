import { HttpException, HttpStatus } from '@nestjs/common';

export class CnabNotResgitredException extends HttpException {
  constructor() {
    super(
      `The CNAB codes have not been registered for this bank.`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
