-- CreateEnum
CREATE TYPE "CharsType" AS ENUM ('BRAND', 'STYLE', 'THEME', 'TREND');

-- CreateTable
CREATE TABLE "Characteristic" (
    "chars_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "chars_type" "CharsType" NOT NULL,

    CONSTRAINT "Characteristic_pkey" PRIMARY KEY ("chars_id")
);

-- CreateTable
CREATE TABLE "ProductChars" (
    "chars_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "ProductChars_pkey" PRIMARY KEY ("chars_id","product_id")
);

-- AddForeignKey
ALTER TABLE "ProductChars" ADD CONSTRAINT "ProductChars_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductChars" ADD CONSTRAINT "ProductChars_chars_id_fkey" FOREIGN KEY ("chars_id") REFERENCES "Characteristic"("chars_id") ON DELETE RESTRICT ON UPDATE CASCADE;
