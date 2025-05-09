import { Injectable } from "@nestjs/common";
import { LetterDto } from "./dto/Letter";
import { StrategyTemplateBuild } from "../../strategy/template-strategy";
import { BuildLetterOutput } from "../../usecase/get-letter/output";

@Injectable()
export class BuildLetterTemplate {
    constructor() {
    }

    createLetter(letter: LetterDto): BuildLetterOutput {
        return StrategyTemplateBuild.getHtml(letter.bank.id, letter)
    }
}