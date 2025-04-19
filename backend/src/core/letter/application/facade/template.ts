import { FactoryLetter } from "core/letter/application/factory/confirm/letter"
import { BuildLetterOutput } from "../usecase/get-letter/output";
import { LetterDto } from "../services/build-template/dto/Letter";

export abstract class TemplateFacade {
    static getHtml(bankId: string, input: LetterDto): BuildLetterOutput {
        switch (bankId) {
            default:
                return FactoryLetter.build('default', input);
        }   
    }
}