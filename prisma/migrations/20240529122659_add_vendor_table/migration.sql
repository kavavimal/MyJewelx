-- CreateTable
CREATE TABLE "Vendor" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "store_name" TEXT NOT NULL,
    "store_url" TEXT,
    "license_number" TEXT,
    "issued_at" TEXT,
    "issued_date" TIMESTAMP(3),
    "licence_address" TEXT,
    "licence_city" TEXT,
    "licence_state" TEXT,
    "licence_zip_code" TEXT,
    "licence_country" TEXT,
    "account_name" TEXT,
    "account_number" TEXT,
    "bank_name" TEXT,
    "bank_iban" TEXT,
    "bank_swift_code" TEXT,
    "bank_address" TEXT,
    "bank_city" TEXT,
    "bank_zip_code" TEXT,
    "bank_country" TEXT,

    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_user_id_key" ON "Vendor"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_store_url_key" ON "Vendor"("store_url");

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_license_number_key" ON "Vendor"("license_number");

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_account_number_key" ON "Vendor"("account_number");

-- AddForeignKey
ALTER TABLE "Vendor" ADD CONSTRAINT "Vendor_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
