import { Expose, plainToInstance, Transform, Type } from "class-transformer";
import { CnabNotResgitredException } from "core/bank/domain/exceptions/cnab-notregistred.exception";
import { have } from "utils/have";

export class BankModel {
  @Expose()
  id: string;
  
  @Expose()
  code: string;

  @Expose()
  name: string;
  
  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}

export class BankModelWithProducts {
  @Expose()
  readonly id: string;
  
  @Expose()
  readonly name: string;

  @Expose({
    name: 'ProductByBank'
  })
  @Transform(({ value }) => plainToInstance(ProductsModel, value, {excludeExtraneousValues: true})) 
  readonly products: ProductsModel[];

  @Expose()
  readonly code: string;

  @Expose()
  @Transform(({ value }) => {
    return JSON.parse(value as unknown as string) as string[]
  })
  readonly cnabs: string[];
}

export class ProductsModel {
  @Expose()
  readonly id: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly description: string;
}
