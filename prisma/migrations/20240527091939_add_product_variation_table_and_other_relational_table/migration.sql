/*
  Warnings:

  - The primary key for the `ProductAttributeValue` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `useForVariation` on the `ProductAttributeValue` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Attribute" ADD COLUMN     "useForVariation" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "ProductAttributeValue" DROP CONSTRAINT "ProductAttributeValue_pkey",
DROP COLUMN "useForVariation",
ADD COLUMN     "productAttributeValue_id" SERIAL NOT NULL,
ADD CONSTRAINT "ProductAttributeValue_pkey" PRIMARY KEY ("productAttributeValue_id");

-- CreateTable
CREATE TABLE "ProductVariation" (
    "variation_id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "productAttributeValue_id" INTEGER[],
    "regular_price" TEXT NOT NULL,
    "selling_price" TEXT,
    "description" TEXT NOT NULL,
    "images" TEXT[],
    "sku" TEXT NOT NULL,
    "stock_management" BOOLEAN NOT NULL DEFAULT false,
    "stock_status" BOOLEAN NOT NULL DEFAULT false,
    "quantity" INTEGER,
    "length" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "thickness" DOUBLE PRECISION NOT NULL,
    "weight_unit" TEXT NOT NULL,
    "net_weight" DOUBLE PRECISION,
    "gross_weight" DOUBLE PRECISION,
    "isPriceFixed" BOOLEAN NOT NULL DEFAULT false,
    "making_charges" TEXT NOT NULL,
    "other_charges" TEXT,

    CONSTRAINT "ProductVariation_pkey" PRIMARY KEY ("variation_id")
);

-- CreateTable
CREATE TABLE "ProductVariationAttribute" (
    "productVariation_id" INTEGER NOT NULL,
    "productAttributeValue_id" INTEGER NOT NULL,

    CONSTRAINT "ProductVariationAttribute_pkey" PRIMARY KEY ("productVariation_id","productAttributeValue_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariation_sku_key" ON "ProductVariation"("sku");

-- AddForeignKey
ALTER TABLE "ProductVariation" ADD CONSTRAINT "ProductVariation_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariationAttribute" ADD CONSTRAINT "ProductVariationAttribute_productVariation_id_fkey" FOREIGN KEY ("productVariation_id") REFERENCES "ProductVariation"("variation_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariationAttribute" ADD CONSTRAINT "ProductVariationAttribute_productAttributeValue_id_fkey" FOREIGN KEY ("productAttributeValue_id") REFERENCES "ProductAttributeValue"("productAttributeValue_id") ON DELETE RESTRICT ON UPDATE CASCADE;
