/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `banks` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `banks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "banks" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "banks_code_key" ON "banks"("code");
