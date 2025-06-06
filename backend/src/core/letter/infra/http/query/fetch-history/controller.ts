import { Controller, Get, Param } from "@nestjs/common";
import { SearchCardHistoryUsecase } from "core/letter/application/usecase/query/search-card-history/usecase";

@Controller()
export class SearchCardHistoryController {
    constructor(private readonly usecase: SearchCardHistoryUsecase) { }
    
    @Get('get-history-letter/:clientId')
    getHistory(@Param('clientId') clientId: string) {
        return this.usecase.execute({clientId});
    } 
}