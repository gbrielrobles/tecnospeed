import { HttpException, HttpStatus } from '@nestjs/common';

export class ProductNotFoundException extends HttpException {
  constructor() {
    super(`Product notfound`, HttpStatus.NOT_FOUND);
  }
}
