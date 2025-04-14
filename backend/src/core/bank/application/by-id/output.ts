export class GetBankByIdOutput {
  id: string;
  name: string;
  code: string;
  products: Product[];
  cnabs: string[];
}

class Product {
  id: string;
  name: string;
  description: string;
}
