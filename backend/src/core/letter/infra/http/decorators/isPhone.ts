import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsPhone(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPhone',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          if (typeof value !== 'string') return false;

          const numbersOnly = value.replace(/\D/g, '');
          return numbersOnly.length === 10 || numbersOnly.length === 11;
        },
        defaultMessage(_args: ValidationArguments) {
          return 'Telefone deve conter 10 ou 11 dígitos numéricos.';
        },
      },
    });
  };
}
