export class BankModel {
  id: string;
  code: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export class BankModelWithProducts {
  id: string;
  name: string;
  cnab: string;
  products: ProductsModel[];
  code: string;
}

export class ProductsModel {
  id: string;
  name: string;
  description: string;
}
