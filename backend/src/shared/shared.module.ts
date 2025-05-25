import { Module } from "@nestjs/common";
import { PrismaAdapter } from "./infra/database/prisma/adapter";
import { RedisAdapter } from "./infra/redis/adapter";

@Module({
    exports: [PrismaAdapter, RedisAdapter],
    providers: [PrismaAdapter, RedisAdapter]
})
export class SharedModule {}