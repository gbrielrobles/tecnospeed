import { Controller } from "@nestjs/common";

@Controller('bank')
export class GetAllBankController {
    constructor(private readonly usecase : GetAllBankUseCase){}

    getAll(){
        return this.usecase.execute();
    }
}