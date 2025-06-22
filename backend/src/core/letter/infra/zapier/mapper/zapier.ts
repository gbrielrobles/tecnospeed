import { Expose } from "class-transformer";

export class ZapierMappedResult {
    @Expose()    
    attempt: string;

    @Expose()    
    id: string;

    @Expose({name: 'request_id'})    
    requestId: string;

    @Expose()    
    status: string;
}