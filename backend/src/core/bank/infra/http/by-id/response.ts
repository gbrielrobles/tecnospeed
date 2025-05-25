import { Expose } from "class-transformer";

export class GetByIdBankResponse {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    code: string;

    @Expose()
    products: Product[]

    @Expose()
    cnabs: string[] 

    @Expose()
    carriers: string[]
}

class Product {
    @Expose()
    id: string;
    
    @Expose()
    name: string;

    @Expose()
    description: string;
}
