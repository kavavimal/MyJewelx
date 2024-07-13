/*
  Warnings:

  - You are about to drop the column `images` on the `ProductVariation` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_subCategoryId_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "subCategoryId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProductVariation" DROP COLUMN "images";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "image";

-- CreateTable
CREATE TABLE "Image" (
    "image_id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "image_type" TEXT NOT NULL,
    "variation_id" INTEGER,
    "user_id" TEXT,
    "category_id" INTEGER,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("image_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Image_user_id_key" ON "Image"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Image_category_id_key" ON "Image"("category_id");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "Category"("category_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_variation_id_fkey" FOREIGN KEY ("variation_id") REFERENCES "ProductVariation"("variation_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("category_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
