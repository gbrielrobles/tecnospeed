class Contact {
    name: string;
    email: string;
    fone: string
}

export class BuildLetterInput {
    bankId: string;
    legalName: string;
    cnpj: string;
    accountNumber: number;
    branchNumber: number;
    selectedProducts: string[];
    selectedCnabs: string[];
    companyContact: Contact;
    bankManagerContact: Contact;
    agreement: string
    hashedHtml?: string;
}

