import { Carrier, Cnabs } from "@prisma/client";
import { Transform, Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsBoolean, IsDefined, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator"
import { CreateLetterInput } from "core/letter/application/usecase/create-letter/input";
import { PREFERENCES_CONTACT } from "core/letter/domain/enum/preferences-contact.enum";
import { IsCnpj } from "../decorators/isCnpj";
import { IsPhone } from "../decorators/isPhone";
import { IsValidDDD } from "../decorators/isValidDDD";
import { IsValidBranchNumber } from "../decorators/isValidBranchNumber";
import { IsValidAccountNumber } from "../decorators/isValidAccountNumber";
import { BrazilianStates } from "core/letter/domain/enum/brazillian-states";


class Contact {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsPhone({ message: 'Telefone inválido. Ex: 44912345678' })
    @IsValidDDD()
    @Transform(({ value }) => {
        if (typeof value !== 'string') return value;
        
        const digits = value.replace(/\D/g, '');

        // Valida se tem pelo menos DDD (2), número (8 ou 9)
        if (digits.length < 10 || digits.length > 11) return value;

        const ddd = digits.slice(0, 2);
        const firstPart = digits.length === 11 ? digits.slice(2, 7) : digits.slice(2, 6);
        const secondPart = digits.length === 11 ? digits.slice(7) : digits.slice(6);

        return `(${ddd}) ${firstPart}-${secondPart}`;
    })
    fone: string;

    @IsString()
    positionCompany: string;
}

export class GetLetterRequest {
    @IsString()
    bankId: string;

    @IsString()
    legalName: string;

    @IsString()
    @IsCnpj()
    @Transform(({ value }) => {
        const digits = value.replace(/\D/g, '').padStart(14, '0');
        return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`
    })
    cnpj: string;

    @IsValidAccountNumber()
    accountNumber: number;

    @IsValidBranchNumber()
    branchNumber: number;

    @IsArray()
    @IsString({each: true})        
    selectedProducts: string[]

    @IsArray()
    @IsEnum(Cnabs, { each: true })
    @ArrayNotEmpty()
    selectedCnabs: Cnabs[];

    @IsDefined()
    @ValidateNested()
    @Type(() => Contact)
    companyContact: Contact;

    @IsDefined()
    @ValidateNested()
    @Type(() => Contact)
    bankManagerContact: Contact;

    @IsString()
    agreement: string

    @IsEnum(BrazilianStates)
    ufBank: string

    @IsString()
    bankCity: string
  
    @IsArray()
    @IsEnum(PREFERENCES_CONTACT, {
        each: true
    })
    preferenceByContact: PREFERENCES_CONTACT[]

    @IsOptional()
    @IsString()
    hashed?: string

    toInput(carrier: Carrier) : CreateLetterInput {
        return {
            bank: {
                accountNumber: this.accountNumber,
                bankId: this.bankId,
                branchNumber: this.branchNumber,
                bankManagerContact: this.bankManagerContact,
                selectedCnabs: this.selectedCnabs,
                selectedProducts: this.selectedProducts,
                bankCity: this.bankCity,
                ufBank: this.ufBank
            },
            cnpj: this.cnpj,
            legalName: this.legalName,
            companyContact: this.companyContact,
            agreement: this.agreement,
            preferenceByContact: this.preferenceByContact,
            carrier: carrier
        }
    }
}
