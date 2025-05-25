import { Expose } from "class-transformer";

export class GetAllBankResponse {
    @Expose()
    id: string;

    @Expose()
    code: string

    @Expose()
    name: string;
}