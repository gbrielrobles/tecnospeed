import {  Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({
  datasourceUrl: 'postgresql://postgres:1234@localhost:5432/postgres',
});

enum Carrier {
  FINNET = 'FINNET',
  NEXXERA = 'NEXXERA'
}

enum Cnabs {
  CNAB240 = "CNAB240",
  CNAB400 = "CNAB400",
  CNAB444 = "CNAB444",
}

async function main() {
  const client = await prisma.client.createMany({
    data: {
      cnpj: '17817520000194',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      id: 'cmbk78ynb000007lbabwkfokt'
    }
  })

  const banks = await prisma.bank.createMany({
    data: [
      {
        id: "cmb2uvkpn00000dl5629m6n02",
        name: 'Banco Itaú',
        code: '341',
        cnabs: [Cnabs.CNAB240, Cnabs.CNAB400],
        carriers: [Carrier.FINNET, Carrier.NEXXERA],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "cmb2uvrfr00010dl55fks0u98",
        name: 'Banco Santander',
        code: '033',
        cnabs: [Cnabs.CNAB240, Cnabs.CNAB400],
        carriers: [Carrier.FINNET, Carrier.NEXXERA],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "cmb2uw3o200020dl5cjdz8duh",
        name: 'Banco Bradesco',
        code: '237',
        cnabs: [Cnabs.CNAB240, Cnabs.CNAB400],
        carriers: [Carrier.FINNET, Carrier.NEXXERA],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "cmb2uwgcc00030dl5fh7gdrz8",
        name: 'Banco do Brasil',
        code: '001',
        cnabs: [Cnabs.CNAB240, Cnabs.CNAB400],
        carriers: [Carrier.FINNET, Carrier.NEXXERA],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "cmb2uwzq900040dl5b19mgcqu",
        name: 'Sicoob',
        code: '756',
        cnabs: [Cnabs.CNAB240, Cnabs.CNAB400],
        carriers: [Carrier.FINNET, Carrier.NEXXERA],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "cmb2ux3pl00050dl5cvkd6rdq",
        name: 'Sicredi',
        code: '748',
        cnabs: [Cnabs.CNAB240, Cnabs.CNAB400],
        carriers: [Carrier.NEXXERA],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
         id: "cmb2uxgsk00060dl51qsr4fta",
        name: 'Caixa Econômica Federal',
        code: '104',
        cnabs: [Cnabs.CNAB240, Cnabs.CNAB400],
        carriers: [Carrier.FINNET, Carrier.NEXXERA],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "cmb2uxyvm00080dl5eojwbedr",
        name: 'Banco Banrisul',
        code: '041',
        cnabs: [Cnabs.CNAB240, Cnabs.CNAB400],
        carriers: [Carrier.FINNET, Carrier.NEXXERA],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "cmb2uy18a00090dl5aq3chw0z",
        name: 'Banco Safra',
        code: '422',
        cnabs: [Cnabs.CNAB240, Cnabs.CNAB400],
        carriers: [Carrier.FINNET, Carrier.NEXXERA],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "cmb2uyac4000a0dl55oir19vq",
        name: 'Banco Daycoval',
        code: '707',
        cnabs: [Cnabs.CNAB400],
        carriers: [Carrier.FINNET,Carrier.NEXXERA],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "cmb2uyotb000b0dl58gybh5jl",
        name: 'Ailos',
        code: '085',
        cnabs: [Cnabs.CNAB240],
        carriers: [Carrier.FINNET],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "cmb2uyt9c000c0dl5aymfd1tx",
        name: 'Banco de Brasília',
        code: '070',
        cnabs: [Cnabs.CNAB240, Cnabs.CNAB400],
        carriers: [Carrier.FINNET, Carrier.NEXXERA],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "cmb2uz3jb000d0dl5hbx102fu",
        name: 'Banco Sofisa',
        code: '637',
        cnabs: [Cnabs.CNAB400],
        carriers: [Carrier.FINNET, Carrier.NEXXERA],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ],
  });

  const products = await prisma.product.createMany({
    data: [
      {
        id: 'cmb2w49kr00010dic54028vu1',
        name: 'BOLETO',
        description: 'Pagamento realizado via boleto bancário',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'cmb2w4g7500020dic0oq2eyq7',
        name: 'PAGAMENTOS',
        description: 'Serviços gerais de pagamento',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'cmb2w4npe00030dic6cty1t09',
        name: 'PIX',
        description: 'Sistema de pagamento instantâneo',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'cmb2w4vb900040dicdhcgd6xy',
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
  });
