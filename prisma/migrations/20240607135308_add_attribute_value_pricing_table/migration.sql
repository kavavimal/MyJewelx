-- CreateTable
CREATE TABLE "attributeValuePricing" (
    "pricing_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "attributeValue_id" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "base_q" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "purity" TEXT,

    CONSTRAINT "attributeValuePricing_pkey" PRIMARY KEY ("pricing_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "attributeValuePricing_name_key" ON "attributeValuePricing"("name");

-- AddForeignKey
ALTER TABLE "attributeValuePricing" ADD CONSTRAINT "attributeValuePricing_attributeValue_id_fkey" FOREIGN KEY ("attributeValue_id") REFERENCES "AttributeValue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
