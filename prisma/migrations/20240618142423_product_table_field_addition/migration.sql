/*
  Warnings:

  - Added the required column `delivery_includes` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `return_policy` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "delivery_includes" TEXT NOT NULL,
ADD COLUMN     "offline_reason" TEXT,
ADD COLUMN     "purchase_note" TEXT,
ADD COLUMN     "return_policy" TEXT NOT NULL;
