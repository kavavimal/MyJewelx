/*
  Warnings:

  - Added the required column `variation_name` to the `ProductVariation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_country_id_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "country_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProductVariation" ADD COLUMN     "variation_name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country"("country_id") ON DELETE SET NULL ON UPDATE CASCADE;
