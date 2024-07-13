-- CreateTable
CREATE TABLE "PricingHistory" (
    "pricingHistory_id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "karat24" DOUBLE PRECISION NOT NULL,
    "karat22" DOUBLE PRECISION NOT NULL,
    "karat21" DOUBLE PRECISION NOT NULL,
    "karat14" DOUBLE PRECISION NOT NULL,
    "karat09" DOUBLE PRECISION NOT NULL,
    "silver" DOUBLE PRECISION NOT NULL,
    "platinum" DOUBLE PRECISION NOT NULL,
    "palladium" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PricingHistory_pkey" PRIMARY KEY ("pricingHistory_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PricingHistory_date_key" ON "PricingHistory"("date");
