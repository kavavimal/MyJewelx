/*
  Warnings:

  - The `selling_price` column on the `ProductVariation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `regular_price` on the `ProductVariation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ProductVariation" DROP COLUMN "regular_price",
ADD COLUMN     "regular_price" DOUBLE PRECISION NOT NULL,
DROP COLUMN "selling_price",
ADD COLUMN     "selling_price" DOUBLE PRECISION;
