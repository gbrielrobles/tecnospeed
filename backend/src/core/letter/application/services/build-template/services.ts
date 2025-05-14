import { Injectable } from "@nestjs/common";
import { StrategyTemplateBuild } from "../../strategy/template-strategy";
import { BuildLetterOutput } from "../../usecase/get-letter/output";
import { FormLetter } from "core/letter/domain/form-letter";

@Injectable()
export class BuildLetterTemplate {
    constructor() {
    }

    createLetter(letter: FormLetter): BuildLetterOutput {
        return StrategyTemplateBuild.getHtml(letter.bank.id, letter)
    }
}