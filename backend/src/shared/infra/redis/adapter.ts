import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisAdapter implements  OnModuleDestroy {
    private client: Redis;
    private readonly logger = new Logger(RedisAdapter.name);
    constructor() {
        this.client = new Redis({
            host: process.env.REDIS_HOST,
            port: +(process.env.REDIS_PORT ?? 6379),
            password: process.env.REDIS_PASSWORD
        });
        this.logger.log('conexão estabelecida');
    }    

    async onModuleDestroy() {
        try {
            if(this.client){
                await this.client.disconnect();
            }
        } catch (err) {
            this.logger.error('Failure to disconnect from Redis');
        }
    }

    get getConnection() {
        return this.client;
    }

}