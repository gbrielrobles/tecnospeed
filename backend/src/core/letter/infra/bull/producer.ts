import { Injectable, Logger } from "@nestjs/common";
import { Queue } from "bullmq";
import { RedisAdapter } from "shared/infra/redis/adapter";
import { Queues } from "shared/infra/bull/queues/letter.queue";
import { generateId } from "utils/generate-id";

@Injectable()
export class LetterProducerQueue {
    private queue : Queue;
    private readonly logger :Logger = new Logger();
    constructor(private readonly redis: RedisAdapter) {
        this.queue = new Queue(Queues.LETTER_QUEUE, {
            connection: this.redis.getConnection,
            defaultJobOptions: {
                removeOnComplete: true,
                attempts: 3,
                removeOnFail: false
            }
        });
    }

    async publish(letter: string[], client: {
        cnpj: string,
        email: string,
        product: string
    }) {
        this.logger.log('publish letter');
        await this.queue.add(
            'LETTER_TO_ZAPIER',
            {
                jobId: generateId(),
                letter: JSON.stringify(letter),
                eventDate: new Date(),
                client: client
            }
        );
        this.logger.log('finisheh sending');
    }
}