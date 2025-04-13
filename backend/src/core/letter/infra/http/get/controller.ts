import { Body, Controller, Get, Post, Render } from "@nestjs/common";
import { BuildLetterUseCase } from "core/letter/application/usecase/build-letter";
import { GetLetterRequest } from "./request";
import { plainToInstance } from "class-transformer";

@Controller()
export class LetterController {
    constructor(private readonly usecase: BuildLetterUseCase) { }
    
    @Post('letter')
    getLetter(@Body() request: GetLetterRequest) {
        return this.usecase.execute(plainToInstance(GetLetterRequest,request).toInput());
    }

}