import { Expose } from "class-transformer";

export class Letter {
    bank: Bank;
    client: Client;
}

export class Bank {
    @Expose()
    code: string;

    @Expose()
    name: string;

    @Expose()
    products: Product[]

    cnabs: Cnab[]
}

class Cnab {
    name: string;
    selected: boolean;
}

 class Client {
    legalName: string;
    cnpj: string;
    accountNumber: number;
    branchNumber: number;
    // agreement: string;
}


 class Product {
    id: string;
    name: string;
    description: string;
    selected: boolean
}