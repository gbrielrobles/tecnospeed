export enum BANK {
    BANCO_DO_BRASIL = '001',
    BRADESCO = '237',
    CAIXA = '104',
    ITAU = '341',
    SANTANDER = '033',
    NUBANK = '260',
    INTER = '077',
    ORIGINAL = '212',
    C6 = '336',
    BS2 = '218',
    SAFRA = '422',
    BMG = '318',
    PAN = '623',
    SICOOB = '756'
}

export enum PRODUCTS {
  BOLETO = 'boleto',
  PAGAMENTO = 'pagamento',
  EXTRATO = 'extrato',
  DDA = 'dda',
}


// export const bankProducts : Record<BANK, PRODUCTS[]> = {
//     [Bank.BANCO_DO_BRASIL]: [Products.BOLETO, Products.PAGAMENTO, Products.EXTRATO, Products.DDA],
//     [Bank.BRADESCO]: [Products.BOLETO, Products.PAGAMENTO, Products.EXTRATO, Products.DDA],
//     [Bank.CAIXA]: [Products.BOLETO, Products.PAGAMENTO, Products.EXTRATO, Products.DDA],
//     [Bank.ITAU]: [Products.BOLETO, Products.PAGAMENTO, Products.EXTRATO, Products.DDA],
//     [Bank.SANTANDER]: [Products.BOLETO, Products.PAGAMENTO, Products.EXTRATO, Products.DDA],
//     [Bank.NUBANK]: [Products.BOLETO, Products.PAGAMENTO, Products.EXTRATO],
//     [Bank.INTER]: [Products.BOLETO, Products.PAGAMENTO, Products.EXTRATO],
//     [Bank.ORIGINAL]: [Products.BOLETO, Products.PAGAMENTO, Products.EXTRATO],
//     [Bank.C6]: [Products.BOLETO, Products.PAGAMENTO, Products.EXTRATO],
//     [Bank.BS2]: [Products.BOLETO, Products.PAGAMENTO, Products.EXTRATO],
//     [Bank.SAFRA]: [],
//     [Bank.BMG]: [],
//     [Bank.PAN]: [],
//     [Bank.SICOOB]: []
// }