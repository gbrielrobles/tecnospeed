import { Injectable, OnModuleInit } from "@nestjs/common";
import { Job, Worker } from "bullmq";
import { SendingLetterUsecase } from "core/letter/application/usecase/actions/sending/usecase";
import { Queues } from "shared/infra/bull/queues/letter.queue";
import { RedisAdapter } from "shared/infra/redis/adapter";
import { ZapierService } from "../zapier/zapier";
import { LetterRepository } from "core/letter/domain/port/repositories/prisma/letter.repository";
import { SendingLetterStatus } from "core/letter/domain/enum/status-letter";
import { ZapierMappedResult } from "../zapier/mapper/zapier";
import { MailerModule } from "@nestjs-modules/mailer";
import { MailerServices } from "../mailer/services";

@Injectable()
export class LetterConsumer implements OnModuleInit {
    private worker: Worker;
    constructor(
        private readonly usecase: SendingLetterUsecase,
        private readonly redis: RedisAdapter,
        private readonly zapier: ZapierService,
        private readonly letterRepository: LetterRepository,
        private readonly mailer : MailerServices,
    ) {}

    onModuleInit() {
     this.createWorker()
    }

    createWorker() {
        this.worker = new Worker(Queues.LETTER_QUEUE, async (job: Job)  => {
            const data: { jobId: string; letter: string; letterId: string; eventDate: Date, client: any} = job.data;
            
            const response : ZapierMappedResult = await this.zapier.sendFile(data.letter, {
                documentClient: data.client.documentClient,
                documentSH: data.client.documentSH,
                email: data.client.email,
                product: data.client.product
            });
        
            await this.letterRepository.updateStatus(SendingLetterStatus.SENDING, {
                letterId: data.letterId,
                responseAPI: response
            });

            await this.mailer.send(
                'viniciusfiel1000@gmail.com',
                'Atendimento Iniciado',
                'Seu ticket foi aberto e já está sendo avaliado! Obrigado pela preferência.',
                data.letter
            );
        }, {    
            connection: this.redis.getConnection,
            concurrency: 5,
            autorun: true,
        })
    }
}