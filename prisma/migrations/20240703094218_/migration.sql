-- CreateEnum
CREATE TYPE "adsType" AS ENUM ('HOME', 'POD');

-- CreateTable
CREATE TABLE "Promotional" (
    "ads_id" SERIAL NOT NULL,
    "ads_title" TEXT NOT NULL,
    "ads_desc" TEXT NOT NULL,
    "ads_link" TEXT NOT NULL,
    "ads_img_url" TEXT NOT NULL,
    "ads_type" "adsType" NOT NULL,

    CONSTRAINT "Promotional_pkey" PRIMARY KEY ("ads_id")
);
