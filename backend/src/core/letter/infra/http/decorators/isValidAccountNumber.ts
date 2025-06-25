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
          if (value === null || value === undefined) return false;
                   
          const stringValue = typeof value === 'number' ? value.toString() : value;
          if (typeof stringValue !== 'string') return false;
          
          const digits = stringValue.replace(/\D/g, '');
          return /^\d{5,12}$/.test(digits);
        },
        defaultMessage(): string {
          return 'Número da conta deve conter entre 5 e 12 dígitos numéricos.';
        },
      },
    });
  };
}
