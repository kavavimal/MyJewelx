/*
  Warnings:

  - You are about to drop the column `description` on the `Country` table. All the data in the column will be lost.
  - You are about to drop the `ProductCountry` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `region` to the `Country` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductCountry" DROP CONSTRAINT "ProductCountry_country_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductCountry" DROP CONSTRAINT "ProductCountry_product_id_fkey";

-- AlterTable
ALTER TABLE "Country" DROP COLUMN "description",
ADD COLUMN     "region" TEXT NOT NULL;

-- DropTable
DROP TABLE "ProductCountry";
