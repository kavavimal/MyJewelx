/*
  Warnings:

  - Added the required column `karat18` to the `PricingHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PricingHistory" ADD COLUMN     "karat18" DOUBLE PRECISION NOT NULL;
