import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { Bank } from "core/letter/domain/letter";
import { LetterDto } from "./dto/Letter";
import { TemplateFacade } from "../../facade/template";
import { BuildLetterOutput } from "../../usecase/get-letter/output";

@Injectable()
export class BuildLetterTemplate {
    constructor() {
    }

    createLetter(letter: LetterDto): BuildLetterOutput {
        return TemplateFacade.getHtml(letter.bank.id, letter)
    }
}