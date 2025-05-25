-- CreateEnum
CREATE TYPE "Cnabs" AS ENUM ('CNAB240', 'CNAB400', 'CNAB444');

-- CreateEnum
CREATE TYPE "StatusOfSending" AS ENUM ('SENDING', 'CANCELED', 'PENDING', 'COMPLETED');

-- CreateEnum
CREATE TYPE "Carrier" AS ENUM ('FINNET', 'NEXXERA');

-- CreateTable
CREATE TABLE "banks" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cnabs" "Cnabs"[],
    "carriers" "Carrier"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "banks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_bank" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "bank_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_bank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client" (
    "id" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "letter" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "status" "StatusOfSending" NOT NULL,
    "carrier" "Carrier" NOT NULL,
    "client_id" TEXT NOT NULL,
    "ticket" TEXT NOT NULL,

    CONSTRAINT "letter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "banks_code_key" ON "banks"("code");

-- AddForeignKey
ALTER TABLE "product_bank" ADD CONSTRAINT "product_bank_bank_id_fkey" FOREIGN KEY ("bank_id") REFERENCES "banks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_bank" ADD CONSTRAINT "product_bank_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "letter" ADD CONSTRAINT "letter_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
