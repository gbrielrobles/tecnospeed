import { Module } from "@nestjs/common";
import { PrismaAdapter } from "./infra/database/prisma/adapter";

@Module({
    exports: [PrismaAdapter],
    providers: [PrismaAdapter]
})
export class SharedModule {

}