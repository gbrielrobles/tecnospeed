/*
  Warnings:

  - Added the required column `finnet` to the `letter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nexera` to the `letter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `letter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `letter` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('SEND', 'PENDING');

-- AlterTable
ALTER TABLE "letter" ADD COLUMN     "finnet" TEXT NOT NULL,
ADD COLUMN     "nexera" TEXT NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "letter" ADD CONSTRAINT "letter_cnpj_user_id_fkey" FOREIGN KEY ("cnpj", "user_id") REFERENCES "client"("cnpj", "user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
