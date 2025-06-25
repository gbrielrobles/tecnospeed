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
          if (value === null || value === undefined) return false;
          
          const stringValue = typeof value === 'number' ? value.toString() : value;
          if (typeof stringValue !== 'string') return false;
          
          const digits = stringValue.replace(/\D/g, '');
          return /^\d{4}$/.test(digits);
        },
        defaultMessage(): string {
          return 'Número da agência deve conter exatamente 4 dígitos numéricos.';
        },
      },
    });
  };
}