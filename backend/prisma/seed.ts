import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    const banks = await prisma.bank.createMany({
            data: [
              { 
                name: 'Banco do Brasil', 
                cnabs: '["CNAB240", "CNAB400"]', 
                createdAt: new Date(), 
                updatedAt: new Date() 
              },
              { 
                name: 'Bradesco', 
                cnabs: '["CNAB240", "CNAB400"]', 
                createdAt: new Date(), 
                updatedAt: new Date() 
              },
              { 
                name: 'Caixa Econômica Federal', 
                cnabs: '["CNAB240"]', 
                createdAt: new Date(), 
                updatedAt: new Date() 
              },
              { 
                name: 'Itaú', 
                cnabs: '["CNAB240", "CNAB400"]', 
                createdAt: new Date(), 
                updatedAt: new Date() 
              },
              { 
                name: 'Santander', 
                cnabs: '["CNAB240", "CNAB400"]', 
                createdAt: new Date(), 
                updatedAt: new Date() 
              },
              { 
                name: 'Banco Safra', 
                cnabs: '["CNAB240"]', 
                createdAt: new Date(), 
                updatedAt: new Date() 
              },
              { 
                name: 'Sicredi', 
                cnabs: '["CNAB240"]', 
                createdAt: new Date(), 
                updatedAt: new Date() 
              },
              { 
                name: 'Sicoob', 
                cnabs: '["CNAB240"]', 
                createdAt: new Date(), 
                updatedAt: new Date() 
              },
              { 
                name: 'Banrisul', 
                cnabs: '["CNAB240"]', 
                createdAt: new Date(), 
                updatedAt: new Date() 
              },
              { 
                name: 'Inter', 
                cnabs: '["CNAB240"]', 
                createdAt: new Date(), 
                updatedAt: new Date() 
              },
              { 
                name: 'Nubank', 
                cnabs: '["CNAB240"]', 
                createdAt: new Date(), 
                updatedAt: new Date() 
              },
              { 
                name: 'Original', 
                cnabs: '["CNAB240"]', 
                createdAt: new Date(), 
                updatedAt: new Date() 
              },
              { 
                name: 'C6 Bank', 
                cnabs: '["CNAB240"]', 
                createdAt: new Date(), 
                updatedAt: new Date() 
              },
              { 
                name: 'Banco Pan', 
                cnabs: '["CNAB240"]', 
                createdAt: new Date(), 
                updatedAt: new Date() 
              },
              { 
                name: 'Mercado Pago', 
                cnabs: '["CNAB240"]', 
                createdAt: new Date(), 
                updatedAt: new Date() 
              },
              { 
                name: 'Neon', 
                cnabs: '["CNAB240"]', 
                createdAt: new Date(), 
                updatedAt: new Date() 
              },
              { 
                name: 'Banco Central do Brasil', 
                cnabs: '["CNAB240"]', 
                createdAt: new Date(), 
                updatedAt: new Date() 
              },
              { 
                name: 'Banco do Nordeste', 
                cnabs: '["CNAB240"]', 
                createdAt: new Date(), 
                updatedAt: new Date() 
              },
              { 
                name: 'Banco da Amazônia', 
                cnabs: '["CNAB240"]', 
                createdAt: new Date(), 
                updatedAt: new Date() 
              },
              { 
                name: 'HSBC', 
                cnabs: '["CNAB240"]', 
                createdAt: new Date(), 
                updatedAt: new Date() 
              },
            ],
          })


  const products = await prisma.product.createMany({
    data: [
        { id: 'ASDJKFP12321DAKL', description: 'BOLETO', createdAt: new Date(), updatedAt: new Date() },
        { id: 'ASDJKFP123221313', description: 'PAGAMENTOS', createdAt: new Date(), updatedAt: new Date() },
        { id: 'ASDJKFP12ASODOF', description: 'PIX', createdAt: new Date(), updatedAt: new Date() },
        { id: 'ASDJKFP12ASO123', description: 'TRANSFERENCIA', createdAt: new Date(), updatedAt: new Date() },
    ]
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })