import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsValidBranchNumber(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidBranchNumber',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') return false;
          return /^\d{4}$/.test(value);
        },
        defaultMessage(): string {
          return 'Número da agência deve conter exatamente 4 dígitos numéricos.';
        },
      },
    });
  };
}