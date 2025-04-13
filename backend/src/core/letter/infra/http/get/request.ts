import { IsArray, IsNumber, IsString, ValidateNested } from "class-validator"
import { BuildLetterInput } from "core/letter/application/usecase/input";

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

    toInput() : BuildLetterInput {
        return {
            accountNumber: this.accountNumber,
            bankId: this.bankId,
            branchNumber: this.branchNumber,
            cnpj: this.cnpj,
            legalName: this.legalName,
            selectedProducts: this.selectedProducts,
            selectedCnabs: this.selectedCnabs
        }
    }
}