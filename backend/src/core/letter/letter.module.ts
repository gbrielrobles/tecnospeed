import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { SharedModule } from "shared/shared.module";
import { LetterController } from "./infra/http/create-letter/controller";
import { CreateLetterUseCase } from "./application/usecase/create-letter/usecase";
import { BankRepository } from "core/bank/domain/port/repositories/bank.repository";
import { BankRepositoryImpl } from "core/bank/infra/database/repositories/bank/bank.repository";
import { CachedLetterRepositoryImpl } from "./infra/cached/cached.repository";
import { CachedLetterRepository } from "./domain/port/repositories/cached/repository";
import { SendingLetterController } from "./infra/http/sending/controller";
import { SendingLetterUsecase } from "./application/usecase/sending/usecase";
import { LetterRepository } from "./domain/port/repositories/prisma/letter.repository";
import { LetterRepositoryImpl } from "./infra/prisma/letter.repository";
import { MetricsMiddleware } from "../../middleware/metrics.middleware";


@Module({
    imports: [SharedModule],
    controllers: [LetterController, SendingLetterController],
    providers: [
        SendingLetterUsecase,
        CreateLetterUseCase,
        {
            provide: BankRepository,
            useClass: BankRepositoryImpl,
        },
        {
            provide: CachedLetterRepository,
            useClass: CachedLetterRepositoryImpl
        },
        {
            provide: LetterRepository,
            useClass: LetterRepositoryImpl
        }
    ]
})
export class LetterModule  {

}