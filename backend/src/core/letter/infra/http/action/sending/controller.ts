import { Body, Controller, Get, Post, Render } from "@nestjs/common";
import { LetterSendingRequest } from "./request";
import { SendingLetterUsecase } from "core/letter/application/usecase/actions/sending/usecase";

@Controller()
export class SendingLetterController {
    constructor(private readonly usecase: SendingLetterUsecase) { }

    @Post('send-letter')
    async sendLetter(@Body() request: LetterSendingRequest) {
        return await this.usecase.execute(request.toInput());
    }

}