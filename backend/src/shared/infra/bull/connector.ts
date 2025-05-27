import { Injectable, OnModuleInit } from "@nestjs/common";
import IORedis from 'ioredis'
import { Queues } from "./queues/letter.queue";
import { Queue } from "bullmq";

@Injectable()
export class ConnectorBullMQ implements OnModuleInit{
    private  connection: IORedis = new IORedis({
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD
    });

    constructor() {}

    onModuleInit() {
        for(const [key, value] of Object.entries(Queues)) { 
            new Queue(value,{
                connection: this.connection
            })
        } 
    }


}