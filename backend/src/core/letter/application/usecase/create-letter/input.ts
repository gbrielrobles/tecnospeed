import { Carrier } from "@prisma/client";
import { PREFERENCES_CONTACT } from "core/letter/domain/enum/preferences-contact.enum";

class Contact {
    name: string;
    email: string;
    fone: string;
    positionCompany ?: string;
}

export class CreateLetterInput {
    cnpj: string;
    legalName: string;
    companyContact: Contact;
    agreement: string;
    preferenceByContact: PREFERENCES_CONTACT[];
    bank: Bank;  
    carrier: Carrier
}

class Bank {
    bankId: string;
    accountNumber: number;
    branchNumber: number;
    selectedProducts: string[];
    selectedCnabs: string[];
    bankManagerContact: Contact;
    bankCity: string;
    ufBank: string;
}
