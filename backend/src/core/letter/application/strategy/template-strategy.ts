import { BuildLetterOutput } from "../usecase/create-letter/output";
import { FormLetter } from "core/letter/domain/form-letter";
import { Carrier } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { LetterFactory } from "../factory/build/letter";

@Injectable()
export class StrategyTemplateBuild {

    constructor(private readonly factory: LetterFactory) {}
    
    getHtml(bankId: string, input: FormLetter, carrier: Carrier): string[] {
         return [this.factory.buildHtml('default', input, carrier)];
    }

    getPdf(input: FormLetter, carrier: Carrier): string[] {
        const pdf = this.factory.buildPdf(input, carrier);
        console.log(pdf);
        return [];
    }
}