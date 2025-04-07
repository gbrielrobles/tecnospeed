export class GetBankByIdOutput {
  id: string;
  name: string;
  code: string;
  products: Product[];
  cnab: string[];
}

class Product {
  id: string;
  name: string;
  description: string;
}
