import { IsArray, IsBoolean, IsNumber, IsString } from "class-validator";
import { PREFERENCES_CONTACT } from "./enum/preferences-contact.enum";
import { Expose, Transform, Type } from "class-transformer";
import { Domain } from "utils/domain";

export class Contact {
    @Expose()
    @IsString()
    name: string;
    
    @Expose()
    @IsString()
    email: string;
    
    @Expose()
    @IsString()
    fone: string
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

    static fromPlain(plain) {

        return Domain.new(this, plain)
    }

    static buildPlain(plain) {
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
            }
                        
        })
    }
}
