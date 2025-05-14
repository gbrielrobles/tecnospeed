import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDefined, IsEmail, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator"
import { GetLetterInput } from "core/letter/application/usecase/get-letter/input";
import { PREFERENCES_CONTACT } from "core/letter/domain/enum/preferences-contact.enum";

class Contact {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    fone: string;

    @IsString()
    @IsOptional()
    positionCompany?: string;
}

export class GetLetterRequest {
    @IsString()
    bankId: string;

    @IsString()
    legalName: string;

    @IsString()
    cnpj: string;

    @IsNumber()
    accountNumber: number;

    @IsNumber()
    branchNumber: number;

    @IsArray()
    @IsString({each: true})        
    selectedProducts: string[]

    @IsArray()
    @IsString({each: true})
    selectedCnabs: string[]

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

    @IsString()
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

    toInput() : GetLetterInput {
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
            preferenceByContact: this.preferenceByContact
        }
    }
}
