import { Injectable,OnModuleDestroy,OnModuleInit} from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaAdapter extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    onModuleDestroy() {
        this.$disconnect();
      }
    
    async onModuleInit() {
        await this.$connect();
      }
}