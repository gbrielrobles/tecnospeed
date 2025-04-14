import { Injectable } from "@nestjs/common";
import { CachedLetterRepository } from "core/letter/domain/port/repositories/cached/repository";
import { RedisAdapter } from "shared/infra/redis/adapter";


@Injectable()
export class CachedLetterRepositoryImpl implements CachedLetterRepository {
    private readonly baseKey = 'html-content-letter:';
    constructor(private readonly redis: RedisAdapter) {}
    
    async set(key: string, content: string) {
        const redis = this.redis.getConnection.set(key, content);
    }

    async get(key : string): Promise<string | null> {
        return await this.redis.getConnection.get(this.baseKey.concat(key));
    }
}