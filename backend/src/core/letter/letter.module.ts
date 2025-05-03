import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { SharedModule } from "shared/shared.module";
import { LetterController } from "./infra/http/get-letter/controller";
import { GetLetterUseCase } from "./application/usecase/get-letter/usecase";
import { BankRepository } from "core/bank/domain/port/repositories/bank.repository";
import { BankRepositoryImpl } from "core/bank/infra/database/repositories/bank/bank.repository";
import { CachedLetterRepositoryImpl } from "./infra/cached/cached.repository";
import { CachedLetterRepository } from "./domain/port/repositories/cached/repository";
import { BuildLetterTemplate } from "./application/services/build-template/services";
import { SendingLetterController } from "./infra/http/sending/controller";
import { SendingLetterUsecase } from "./application/usecase/sending/usecase";
import { MetricsMiddleware } from "../../middleware/metrics.middleware";

@Module({
    imports: [SharedModule, ],
    controllers: [LetterController, SendingLetterController],
    providers: [
        SendingLetterUsecase,
        GetLetterUseCase,
        BuildLetterTemplate,
        {
            provide: BankRepository,
            useClass: BankRepositoryImpl,
        },
        {
            provide: CachedLetterRepository,
            useClass: CachedLetterRepositoryImpl
        },
    ]
})
export class LetterModule  {

}