import { Body, Controller, Get, Post, Render } from "@nestjs/common";
import { BuildLetterUseCase } from "core/letter/application/usecase/build-letter";
import { GetLetterRequest } from "./request";
import { plainToInstance } from "class-transformer";

@Controller()
export class LetterController {
    constructor(private readonly usecase: BuildLetterUseCase) { }
    // @Body() request: GetLetterRequest
    @Get('letter')
    getLetter() {
            let request : GetLetterRequest = new GetLetterRequest(); 
            request.bankId = "cm9j2rrfx0001lordv2hx2ny0";
            request.legalName=  "teste";
            request.cnpj ="093452000130";
            request.accountNumber= 123;
            request.branchNumber = 123;
            request.selectedCnabs = ["CNAB240"];
            request.selectedProducts = ["cm9j2rrg3000mlordwfosxuqt"];
            request.companyContact = {
                name: "teste",
                email: "teste@gmail.com",
                fone : "449963214563"
            },
            request.bankManagerContact = {
                name: "teste",
                email: "teste@gmail.com",
                fone : "449963214563"
            },
            request.agreement= "teste";

        return this.usecase.execute(plainToInstance(GetLetterRequest,request).toInput());
    }

}