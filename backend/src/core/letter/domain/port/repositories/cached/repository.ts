export abstract class CachedLetterRepository {
    abstract set<T>(key: string, content: T) : Promise<void>;
    abstract get(key: string): Promise<string | null>; 
}