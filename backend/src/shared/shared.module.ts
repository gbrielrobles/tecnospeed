import { Module } from "@nestjs/common";
import { PrismaAdapter } from "./infra/database/prisma/adapter";
import { RedisAdapter } from "./infra/redis/adapter";
import { ConnectorBullMQ } from "./infra/bull/connector";

@Module({
    exports: [PrismaAdapter, RedisAdapter, ConnectorBullMQ],
    providers: [PrismaAdapter, RedisAdapter, ConnectorBullMQ]
})
export class SharedModule {}