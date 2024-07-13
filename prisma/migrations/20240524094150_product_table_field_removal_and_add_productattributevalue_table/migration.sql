/*
  Warnings:

  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `sku` on the `Product` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Product_sku_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "description",
DROP COLUMN "images",
DROP COLUMN "sku";

-- CreateTable
CREATE TABLE "ProductAttributeValue" (
    "product_id" INTEGER NOT NULL,
    "attribute_id" INTEGER NOT NULL,
    "attributeValue_id" INTEGER NOT NULL,
    "useForVariation" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ProductAttributeValue_pkey" PRIMARY KEY ("attribute_id","product_id","attributeValue_id")
);

-- AddForeignKey
ALTER TABLE "ProductAttributeValue" ADD CONSTRAINT "ProductAttributeValue_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductAttributeValue" ADD CONSTRAINT "ProductAttributeValue_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "Attribute"("attribute_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductAttributeValue" ADD CONSTRAINT "ProductAttributeValue_attributeValue_id_fkey" FOREIGN KEY ("attributeValue_id") REFERENCES "AttributeValue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
