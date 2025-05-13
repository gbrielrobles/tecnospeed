import { FactoryLetter } from "core/letter/application/factory/confirm/letter"
import { BuildLetterOutput } from "../usecase/get-letter/output";
import { FormLetter } from "core/letter/domain/form-letter";

export abstract class StrategyTemplateBuild {
    static getHtml(bankId: string, input: FormLetter): BuildLetterOutput {
        switch (bankId) {
            default:
                return FactoryLetter.build('default', input);
        }   
    }
}