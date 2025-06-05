import { ExpressAdapter } from "@bull-board/express";
import { BullBoardModule } from "@bull-board/nestjs";
import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";
import { Queues } from "./queues/letter.queue";
import expressBasicAuth from "express-basic-auth";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";

@Module({
    imports : [
        BullBoardModule.forRoot({
              route: "/queues",
              adapter: ExpressAdapter,
              middleware: expressBasicAuth({
                challenge: true,
                users: { 
                  admin: '1234'
                 }, 
              }),
            }),
            BullModule.registerQueue({
              name: Queues.LETTER_QUEUE,
               connection: {
                  host: 'localhost',
                  port: 6379,
                  password: process.env.REDIS_PASSWORD,
                },
          }),
            BullBoardModule.forFeature({
              name: Queues.LETTER_QUEUE,
              adapter: BullMQAdapter,
            })
    ]
})
export class BullDashMQModule {}