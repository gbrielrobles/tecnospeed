import { Bank } from "../../domain/bank";

export class GetProductsUsecase {
    constructor() {}

    async execute(bankCode: string): Promise<Bank> {
        const bank = new Bank();
        bank.code = bankCode;
        bank.name = 'Banco do Brasil';
        bank.products = [
            { code: 'boleto', name: 'Boleto', description: 'Emissão de boletos' },
            { code: 'pagamento', name: 'Pagamento', description: 'Pagamento de contas' },
            { code: 'extrato', name: 'Extrato', description: 'Extrato da conta' },
            { code: 'dda', name: 'DDA', description: 'Débito direto autorizado' },
        ];

        return bank;
    }
}