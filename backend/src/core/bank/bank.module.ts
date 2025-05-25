import { Module } from "@nestjs/common";
import { GetAllBankController } from "./infra/http/get-all/controller";
import { GetByIdBankController } from "./infra/http/by-id/controller";
import { GetAllBankUseCase } from "./application/get-all/usecase";
import { GetByIdBankUsecase } from "./application/by-id/usecase";
import { BankRepository } from "./domain/port/repositories/bank.repository";
import { BankRepositoryImpl } from "./infra/database/repositories/bank/bank.repository";
import { SharedModule } from "shared/shared.module";

@Module({
    imports: [
        SharedModule
    ],
    controllers: [GetAllBankController, GetByIdBankController],
    providers: [
        GetAllBankUseCase,
        GetByIdBankUsecase,
        {
            provide: BankRepository,
            useClass: BankRepositoryImpl,
        },
    ]
})
export class BankModule {

}