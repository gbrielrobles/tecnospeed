import { Body, Controller, Get, Post, Render } from "@nestjs/common";
import { GetLetterUseCase } from "core/letter/application/usecase/get-letter/usecase";
import { GetLetterRequest } from "./request";
import { plainToInstance } from "class-transformer";
import { PREFERENCES_CONTACT } from "core/letter/domain/enum/preferences-contact.enum";

@Controller()
export class LetterController {
    constructor(private readonly usecase: GetLetterUseCase) { }

    @Post('letter')
    async getLetter(@Body() request: GetLetterRequest) {
        console.log(request);
        return await this.usecase.execute(request.toInput());

    }

}