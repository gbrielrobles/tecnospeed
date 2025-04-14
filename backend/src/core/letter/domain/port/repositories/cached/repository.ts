export abstract class CachedLetterRepository {
    abstract set(key: string, content: string);
    abstract get(key: string): Promise<string | null>; 
}