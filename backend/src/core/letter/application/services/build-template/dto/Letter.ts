import { Expose } from "class-transformer";
import { PREFERENCES_CONTACT } from "core/letter/domain/enum/preferences-contact.enum";



export class ContactDto {
    @Expose()
    name: string;

    @Expose()
    email: string;

    @Expose()
    fone: string;

    @Expose()
    positionCompany?: string;
}

export class CnabDto {
    @Expose()
    name: string;

    @Expose()
    selected: boolean;
}

export class ClientDto {
    @Expose()
    legalName: string;

    @Expose()
    cnpj: string;
    
    @Expose()
    accountNumber: number;

    @Expose()
    branchNumber: number;

    @Expose()
    preferenceByContact: PreferenceByContactDto[]

    @Expose()
    companyContact: ContactDto

    @Expose()
    agreement: string;
}

export class BankDto {
    @Expose()
    id: string;

    @Expose()
    code: string;

    @Expose()
    name: string;

    @Expose()
    ufBank: string;

    @Expose()
    bankCity: string;

    @Expose()
    products: ProductDto[]

    @Expose()
    cnabs: CnabDto[]

    @Expose()
    bankContactManager: ContactDto
}
 
export class PreferenceByContactDto {
    description: string;
    selected: boolean;
}

export class ProductDto {
    @Expose()
    id: string;

    @Expose()
    name: string;
    
    @Expose()
    description: string;

    @Expose()
    selected: boolean = false
}

export class LetterDto {
    @Expose()
    client: ClientDto;
    
    @Expose()
    bank: BankDto;
}