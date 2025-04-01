export class BankModel {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export class BankModelWithProducts {
    id: string;
    name: string;
    cnab: string;
    products: ProductsModel[];
}

export class ProductsModel {
    id: string;
    name: string;
    description: string;
}