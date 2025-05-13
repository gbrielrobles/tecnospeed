import { Injectable } from "@nestjs/common";
import { LetterDto } from "./dto/Letter";
import { StrategyTemplateBuild } from "../../strategy/template-strategy";
import { BuildLetterOutput } from "../../usecase/get-letter/output";
import { Letter } from "core/letter/domain/letter";
import { FormLetter } from "core/letter/domain/form-letter";

@Injectable()
export class BuildLetterTemplate {
    constructor() {
    }

    createLetter(letter: FormLetter): BuildLetterOutput {
        return StrategyTemplateBuild.getHtml(letter.bank.id, letter)
    }
}