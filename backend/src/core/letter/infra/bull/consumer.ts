import { Injectable, OnModuleInit } from "@nestjs/common";
import { Job, Worker } from "bullmq";
import { SendingLetterUsecase } from "core/letter/application/usecase/sending/usecase";
import { Queues } from "shared/infra/bull/queues/letter.queue";
import { RedisAdapter } from "shared/infra/redis/adapter";
import { BuilderPdF } from "utils/build-pdf";
import { ZapierService } from "../zapier/zapier";

@Injectable()
export class LetterConsumer implements OnModuleInit {
    private worker: Worker;
    constructor(
        private readonly usecase: SendingLetterUsecase,
        private readonly redis: RedisAdapter,
        private readonly zapier: ZapierService
    ) {}

    onModuleInit() {
     this.createWorker()
    }

    createWorker() {
        this.worker = new Worker(Queues.LETTER_QUEUE, async (job: Job)  => {
            const data : {jobId: string; letter: string; eventDate: Date} = job.data;

            const base64PDF = await BuilderPdF.create(data.letter).fromHtmlToPdf();
            await this.zapier.sendFile(base64PDF, {
                
            })
        }, {    
            connection: this.redis.getConnection,
            concurrency: 5,
            autorun: true,
        })
    }
}