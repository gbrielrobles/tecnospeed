import { Module } from "@nestjs/common";
import { SharedModule } from "shared/shared.module";
import { LetterController } from "./infra/http/get/controller";
import { BuildLetterUseCase } from "./application/usecase/build-letter";
import { BankRepository } from "core/bank/domain/port/repositories/bank.repository";
import { BankRepositoryImpl } from "core/bank/infra/database/repositories/bank/bank.repository";

@Module({
    imports: [SharedModule],
    controllers: [LetterController],
    providers: [BuildLetterUseCase, {
        provide: BankRepository,
        useClass: BankRepositoryImpl,
    },
    ]
})
export class LetterModule {


}