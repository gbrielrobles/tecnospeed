import { Expose } from "class-transformer";

export class Letter {
    bank: Bank;
    client: Client;
}

export class Bank {
    code: string;
    name: string;
    products: Product[]
    cnabs: Cnab[]
    bankContactManager: Contact
}

class Contact {
    name: string;
    email: string;
    fone: string
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
    companyContact: Contact 
    agreement: string;
}


class Product {
    id: string;
    name: string;
    description: string;
    selected: boolean
}