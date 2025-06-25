import { Carrier, Cnabs } from "@prisma/client";
import { Transform, Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsBoolean, IsDefined, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator"
import { CreateLetterInput } from "core/letter/application/usecase/actions/create-letter/input";
import { PREFERENCES_CONTACT } from "core/letter/domain/enum/preferences-contact.enum";
import { IsCnpj } from "../../decorators/isCnpj";
import { IsPhone } from "../../decorators/isPhone";
import { IsValidDDD } from "../../decorators/isValidDDD";
import { IsValidBranchNumber } from "../../decorators/isValidBranchNumber";
import { IsValidAccountNumber } from "../../decorators/isValidAccountNumber";
import { BrazilianStates } from "core/letter/domain/enum/brazillian-states";


class Contact {
    @IsNotEmpty({ message: 'Nome é obrigatório.' })
    @IsString()
    name: string;

    @IsNotEmpty({ message: 'Email é obrigatório.' })
    @IsEmail()
    email: string;

    @IsNotEmpty({ message: 'Telefone é obrigatório.' })
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

    @IsNotEmpty({ message: 'Cargo é obrigatório.' })
    @IsString()
    positionCompany: string;
}

export class GetLetterRequest {
    @IsNotEmpty({ message: 'ID do banco é obrigatório.' })
    @IsString()
    bankId: string;

    @IsNotEmpty({ message: 'Razão social é obrigatória.' })
    @IsString()
    legalName: string;

    @IsNotEmpty({ message: 'CNPJ é obrigatório.' })
    @IsString()
    @IsCnpj()
    @Transform(({ value }) => {
        const digits = value.replace(/\D/g, '').padStart(14, '0');
        return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`
    })
    cnpj: string;

    @IsNotEmpty({ message: 'Número da conta é obrigatório.' })
    @IsValidAccountNumber()
    accountNumber: number;

    @IsNotEmpty({ message: 'Número da agência é obrigatório.' })
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

    @IsNotEmpty({ message: 'Convênio é obrigatório.' })
    @IsString()
    agreement: string

    @IsNotEmpty({ message: 'UF do banco é obrigatória.' })
    @IsEnum(BrazilianStates)
    ufBank: string

    @IsNotEmpty({ message: 'Cidade do banco é obrigatória.' })
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
