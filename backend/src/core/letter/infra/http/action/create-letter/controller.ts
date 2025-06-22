import { Body, Controller, Get, Param, ParseIntPipe, Post, Render } from "@nestjs/common";
import {CreateLetterUseCase } from "core/letter/application/usecase/actions/create-letter/usecase";
import { GetLetterRequest } from "./request";
import { Carrier } from "core/letter/domain/enum/carrier";
import { ParseToCarrier } from "../../pipes/parse-transform-to-carrier";

@Controller()
export class LetterController {
    constructor(private readonly usecase: CreateLetterUseCase) { }

    @Post('letter/:carrier')
    async create(
        @Body() request: GetLetterRequest,
        @Param('carrier',  ParseToCarrier) carrier: Carrier
    ) {
        return await this.usecase.execute(request.toInput(carrier));
    }
}