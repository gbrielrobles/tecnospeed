import { Bank } from "../../bank";

export abstract class BankRepository {
    abstract findAll(): Promise<Bank[]>;
    abstract findById(id: string): Promise<Bank>;
}