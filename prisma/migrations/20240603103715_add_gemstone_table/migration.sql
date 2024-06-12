-- CreateTable
CREATE TABLE "Gemstone" (
    "gemstone_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Gemstone_pkey" PRIMARY KEY ("gemstone_id")
);

-- CreateTable
CREATE TABLE "GemstoneProductVariation" (
    "gemstone_id" INTEGER NOT NULL,
    "variation_id" INTEGER NOT NULL,

    CONSTRAINT "GemstoneProductVariation_pkey" PRIMARY KEY ("gemstone_id","variation_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Gemstone_name_key" ON "Gemstone"("name");

-- AddForeignKey
ALTER TABLE "GemstoneProductVariation" ADD CONSTRAINT "GemstoneProductVariation_gemstone_id_fkey" FOREIGN KEY ("gemstone_id") REFERENCES "Gemstone"("gemstone_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GemstoneProductVariation" ADD CONSTRAINT "GemstoneProductVariation_variation_id_fkey" FOREIGN KEY ("variation_id") REFERENCES "ProductVariation"("variation_id") ON DELETE RESTRICT ON UPDATE CASCADE;
