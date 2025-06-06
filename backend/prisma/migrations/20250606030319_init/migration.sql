/*
  Warnings:

  - Added the required column `letter` to the `letter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "letter" ADD COLUMN     "letter" TEXT NOT NULL;
