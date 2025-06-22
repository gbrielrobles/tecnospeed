import { HttpException } from '@nestjs/common';

type ErrorCallback = () => HttpException;

export const have = <T>(a: T[], error: string | ErrorCallback): T[] => {
  if (a.length >= 1) {
    return a;
  }

  if (typeof error === 'string') throw new Error(error);

  throw error();
};
