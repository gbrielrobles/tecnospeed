export abstract class CachedLetterRepository {
    abstract set(key: string, content: string) : Promise<void>;
    abstract get(key: string): Promise<string | null>; 
}