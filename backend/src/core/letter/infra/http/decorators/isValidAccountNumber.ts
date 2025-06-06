import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsValidAccountNumber(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidAccountNumber',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') return false;
          return /^\d{5,12}$/.test(value);
        },
        defaultMessage(): string {
          return 'Número da conta deve conter entre 5 e 12 dígitos numéricos.';
        },
      },
    });
  };
}
