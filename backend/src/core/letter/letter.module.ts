import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { SharedModule } from "shared/shared.module";
import { LetterController } from "./infra/http/action/create-letter/controller";
import { CreateLetterUseCase } from "./application/usecase/actions/create-letter/usecase";
import { BankRepository } from "core/bank/domain/port/repositories/bank.repository";
import { BankRepositoryImpl } from "core/bank/infra/database/repositories/bank/bank.repository";
import { CachedLetterRepositoryImpl } from "./infra/cached/cached.repository";
import { CachedLetterRepository } from "./domain/port/repositories/cached/repository";
import { SendingLetterController } from "./infra/http/action/sending/controller";
import { SendingLetterUsecase } from "./application/usecase/actions/sending/usecase";
import { LetterRepository } from "./domain/port/repositories/prisma/letter.repository";
import { LetterRepositoryImpl } from "./infra/prisma/letter.repository";
import { LetterProducerQueue } from "./infra/bull/producer";
import { LetterConsumer } from "./infra/bull/consumer";
import { HttpModule } from "@nestjs/axios";
import { StrategyTemplateBuild } from "./application/strategy/template-strategy";
import { ZapierService } from "./infra/zapier/zapier";
import { LetterFactory } from "./application/factory/build/letter";
import { SearchCardHistoryController } from "./infra/http/query/fetch-history/controller";
import { SearchCardHistoryUsecase } from "./application/usecase/query/search-card-history/usecase";
import { MailerServices } from "./infra/mailer/services";


@Module({
    imports: [SharedModule, HttpModule],
    controllers: [LetterController, SendingLetterController, SearchCardHistoryController],
    providers: [
        SendingLetterUsecase,
        CreateLetterUseCase,
        LetterProducerQueue,
        LetterConsumer,
        ZapierService,
        StrategyTemplateBuild,
        LetterFactory,
        SearchCardHistoryUsecase,
        MailerServices,
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