// is-cnpj-length.decorator.ts
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsCnpj(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isCnpjLength',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          if (typeof value !== 'string') return false;

          const numbersOnly = value.replace(/\D/g, '');
          return numbersOnly.length === 14;
        },
        defaultMessage(_args: ValidationArguments) {
          return 'CNPJ deve conter exatamente 14 dígitos numéricos.';
        },
      },
    });
  };
}
