/*
  Warnings:

  - The values [PENDING] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `client` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cnpj` on the `letter` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('SEND', 'CANCELED');
ALTER TABLE "letter" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "letter" DROP CONSTRAINT "letter_cnpj_user_id_fkey";

-- AlterTable
ALTER TABLE "client" DROP CONSTRAINT "client_pkey",
ADD CONSTRAINT "client_pkey" PRIMARY KEY ("user_id");

-- AlterTable
ALTER TABLE "letter" DROP COLUMN "cnpj";

-- AddForeignKey
ALTER TABLE "letter" ADD CONSTRAINT "letter_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "client"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
