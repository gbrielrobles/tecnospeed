import { GetBankByIdOutput } from "src/core/bank/application/by-id/output";
import { GetAllBankOutput } from "src/core/bank/application/get-all/output";

export abstract class BankRepository {
    abstract findAll(): Promise<GetAllBankOutput[]>;
    abstract findById(id: string): Promise<GetBankByIdOutput>;
}