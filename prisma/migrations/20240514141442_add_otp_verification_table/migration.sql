-- CreateTable
CREATE TABLE "OtpVerification" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "phone_number" TEXT,
    "otp" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "expiry" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OtpVerification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OtpVerification_email_key" ON "OtpVerification"("email");

-- CreateIndex
CREATE UNIQUE INDEX "OtpVerification_phone_number_key" ON "OtpVerification"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "OtpVerification_email_phone_number_key" ON "OtpVerification"("email", "phone_number");
