import { HttpException } from '@nestjs/common';

type ErrorCallback = () => HttpException;

export const required = <T>(value: T, error: string | ErrorCallback): T => {
  if (!value) {
    if (typeof error === 'string') throw new Error(error);
    throw error();
  }

  return value;
};
