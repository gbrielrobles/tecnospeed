import { Expose } from "class-transformer";

export class Bank {
  id: string;
  name: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Products {
  @Expose()
  code: string;

  @Expose()
  name: string;
  
  @Expose()
  description: string;
}
