import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

const validDDDs = [
  '11','12','13','14','15','16','17','18','19',
  '21','22','24','27','28',
  '31','32','33','34','35','37','38',
  '41','42','43','44','45','46',
  '47','48','49',
  '51','53','54','55',
  '61','62','64','63','65','66','67','68','69',
  '71','73','74','75','77','79',
  '81','82','83','84','85','86','87','88','89',
  '91','92','93','94','95','96','97','98','99'
];

export function IsValidDDD(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidDDD',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          if (typeof value !== 'string') return false;

          const digits = value.replace(/\D/g, '');
          const ddd = digits.slice(0, 2);
          return validDDDs.includes(ddd);
        },
        defaultMessage(_args: ValidationArguments) {
          return 'DDD inválido. Forneça um DDD brasileiro válido.';
        },
      },
    });
  };
}