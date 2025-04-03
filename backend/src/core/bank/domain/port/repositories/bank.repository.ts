import {
  BankModel,
  BankModelWithProducts,
} from 'src/core/bank/infra/database/repositories/bank/models/bank.model';

export abstract class BankRepository {
  abstract findAll(): Promise<BankModel[]>;
  abstract findById(id: string): Promise<BankModelWithProducts>;
}
