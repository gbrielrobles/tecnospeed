
export class Letter {
    bank: Bank;
    client: Client;
    product: Product[]
}

class Product {
    id: string;
}

class Client {
    legalName: string;
    cnpj: string;
    accountNumber: number;
    branchNumber: number;
    // agreement: string;
}

class Bank {
    code: string;
    name: string;
}