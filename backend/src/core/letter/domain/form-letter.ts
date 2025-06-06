import { IsArray, IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { PREFERENCES_CONTACT } from "./enum/preferences-contact.enum";
import { Expose, Transform, Type } from "class-transformer";
import { Domain } from "utils/domain";
import { Carrier } from "./enum/carrier";

export class IFormLetter {
    client: Client;
    bank: Bank;
    carrier: Carrier;
}

export class Contact {
    @Expose()
    @IsString()
    name: string;
    
    @Expose()
    @IsString()
    email: string;
    
    @Expose()
    @IsString()
    fone: string;

    @Expose()
    @IsString()
    @IsOptional()
    positionCompany: string;
    
}

export class Bank {
    @Expose()
    @IsString()
    id:string;
    
    @Expose()
    @IsString()
    code: string;

    @Expose()
    @IsString()
    name: string;

    @Expose()
    @IsString()
    ufBank: string;

    @Expose()
    @IsString()
    bankCity: string;
        
    @Expose()
    @IsString({
        each: true
    })
    @IsArray()
    products: Product[]

    @Expose()
    @IsString({
        each: true
    })
    @IsArray()
    cnabs: Cnab[]

    @Expose()
    @Type(() => Contact)
    bankContactManager: Contact
    
}


class Cnab {
    @Expose()
    @IsString()
    name: string;

    @Expose()
    @Transform(({value}) => value == 'true' ? true : false)
    @IsBoolean()
    selected: boolean;
}

class Client {
    @Expose()
    @IsString()
    legalName: string;

    @Expose()
    @IsString()
    cnpj: string;

    @Expose()
    @IsNumber()
    accountNumber: number;

    @Expose()
    @IsNumber()
    branchNumber: number;

    @Expose()
    @Type(() => Contact)
    companyContact: Contact 

    @Expose()
    @IsString()
    agreement: string;
}


class Product {
    @Expose()
    @IsString()
    id: string;

    @Expose()
    @IsString()
    name: string;

    @Expose()
    @IsString()
    description: string;

    @Expose()
    @Transform(({value}) => value == 'true' ? true : false)
    @IsBoolean()
    selected: boolean
}

export class FormLetter {
    @Expose()
    @Type(() => Bank)
    bank: Bank;

    @Expose()
    @Type(() => Client)
    client: Client; 

    @Expose()
    @IsEnum(Carrier)
    carrier: Carrier;

    static fromPlain(plain) {
        return Domain.new(this, plain)
    }

    static create(plain) {
        return FormLetter.fromPlain({ 
            bank: {
                id: plain.id,
                bankContactManager: plain.bank.bankManagerContact,
                code: plain.code,
                name: plain.name,
                ufBank: plain.bank.ufBank,
                bankCity: plain.bank.bankCity,
                products: plain.products.map(p => {
                    return {
                        id: p.id,
                        description: p.description,
                        name: p.name,
                        selected: plain.bank.selectedProducts.includes(p.id)
                    }
                }),
                cnabs: plain.cnabs.map(cnab => {
                    return {
                        name: cnab,
                        selected: plain.bank.selectedCnabs.includes(cnab)
                    }
                })
            },
            client: {
                accountNumber: plain.bank.accountNumber,
                agreement: plain.agreement,
                branchNumber: plain.bank.branchNumber,
                cnpj: plain.cnpj,
                companyContact: plain.companyContact,
                legalName: plain.legalName,
                preferenceByContact: Object.entries(PREFERENCES_CONTACT).map(([key, value]) => {
                    return {
                        description: key,
                        selected: plain.preferenceByContact.includes(value as PREFERENCES_CONTACT),
                    }
                })
            },
            carrier: plain.carrier         
        })
    }
}
