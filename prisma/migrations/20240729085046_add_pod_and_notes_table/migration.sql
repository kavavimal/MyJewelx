-- CreateEnum
CREATE TYPE "PODStatus" AS ENUM ('DRAFT', 'REQUESTED', 'PUBLISHED', 'ACCEPTEDBYSELLER', 'SOLD', 'CANCELED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "LOGTYPES" AS ENUM ('LOG', 'SUCCESS', 'ERROR', 'DEV');

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "pod_id" INTEGER;

-- CreateTable
CREATE TABLE "ProductOnDemand" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "metal_type" TEXT NOT NULL,
    "karat" TEXT,
    "weight_type" TEXT NOT NULL,
    "min_weight" TEXT,
    "max_weight" TEXT,
    "price_type" TEXT NOT NULL,
    "min_price" DOUBLE PRECISION,
    "max_price" DOUBLE PRECISION,
    "made_in" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "Status" "PODStatus" NOT NULL DEFAULT 'DRAFT',
    "Note" TEXT,

    CONSTRAINT "ProductOnDemand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Logs" (
    "id" SERIAL NOT NULL,
    "type" "LOGTYPES" NOT NULL DEFAULT 'LOG',
    "details" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "orderId" INTEGER,

    CONSTRAINT "Logs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_pod_id_fkey" FOREIGN KEY ("pod_id") REFERENCES "ProductOnDemand"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOnDemand" ADD CONSTRAINT "ProductOnDemand_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logs" ADD CONSTRAINT "Logs_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
