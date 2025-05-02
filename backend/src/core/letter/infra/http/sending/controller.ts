import { Body, Controller, Get, Post, Render } from "@nestjs/common";
import { GetLetterUseCase } from "core/letter/application/usecase/get-letter/usecase";
import { LetterSendingRequest } from "./request";
import { SendingLetterUsecase } from "core/letter/application/usecase/sending/usecase";

@Controller()
export class SendingLetterController {
    constructor(private readonly usecase: SendingLetterUsecase) { }

    @Post('send-letter')
    async sendLetter(@Body() request: LetterSendingRequest) {
        return await this.usecase.execute(request.toInput());
    }

}