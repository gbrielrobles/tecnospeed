import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const banks = await prisma.bank.createMany({
    data: [
      {
        name: 'Banco do Brasil',
        code: '001',
        cnabs: '["CNAB240", "CNAB400"]',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Banco Central do Brasil',
        code: '002',
        cnabs: '["CNAB240"]',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bradesco',
        code: '237',
        cnabs: '["CNAB240", "CNAB400"]',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Caixa Econômica Federal',
        code: '104',
        cnabs: '["CNAB240"]',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Itaú',
        code: '341',
        cnabs: '["CNAB240", "CNAB400"]',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Santander',
        code: '033',
        cnabs: '["CNAB240", "CNAB400"]',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Banco Safra',
        code: '422',
        cnabs: '["CNAB240"]',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sicredi',
        code: '748',
        cnabs: '["CNAB240"]',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sicoob',
        code: '756',
        cnabs: '["CNAB240"]',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Banrisul',
        code: '041',
        cnabs: '["CNAB240"]',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Inter',
        code: '077',
        cnabs: '["CNAB240"]',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Nubank',
        code: '260',
        cnabs: '["CNAB240"]',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Original',
        code: '212',
        cnabs: '["CNAB240"]',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'C6 Bank',
        code: '336',
        cnabs: '["CNAB240"]',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Banco Pan',
        code: '623',
        cnabs: '["CNAB240"]',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Mercado Pago',
        code: '323',
        cnabs: '["CNAB240"]',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Neon',
        code: '735',
        cnabs: '["CNAB240"]',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Banco do Nordeste',
        code: '004',
        cnabs: '["CNAB240"]',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Banco da Amazônia',
        code: '003',
        cnabs: '["CNAB240"]',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'HSBC',
        code: '399',
        cnabs: '["CNAB240"]',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  });

  const products = await prisma.product.createMany({
    data: [
      {
        name: 'BOLETO',
        description: 'Pagamento realizado via boleto bancário',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'PAGAMENTOS',
        description: 'Serviços gerais de pagamento',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'PIX',
        description: 'Sistema de pagamento instantâneo',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'TRANSFERENCIA',
        description: 'Transferências entre contas bancárias',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  });

  const banksData = await prisma.bank.findMany();
  const productsData = await prisma.product.findMany();

  const productByBankData = banksData.flatMap((bank) =>
    productsData
      .filter(() => Math.random() > 0.5)
      .map((product) => ({
        bankId: bank.id,
        productId: product.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
  );

  await prisma.productByBank.createMany({
    data: productByBankData,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
