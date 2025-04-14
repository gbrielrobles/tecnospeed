import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDefined, IsEmail, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator"
import { BuildLetterInput } from "core/letter/application/usecase/input";

class Contact {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    fone: string
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

    @IsOptional()
    @IsString()
    hashedHtml?: string

    toInput() : BuildLetterInput {
        return {
            accountNumber: this.accountNumber,
            bankId: this.bankId,
            branchNumber: this.branchNumber,
            cnpj: this.cnpj,
            legalName: this.legalName,
            selectedProducts: this.selectedProducts,
            selectedCnabs: this.selectedCnabs,
            bankManagerContact: this.bankManagerContact,
            companyContact: this.companyContact,
            hashedHtml: this.hashedHtml,
            agreement: this.agreement
        }
    }
}
