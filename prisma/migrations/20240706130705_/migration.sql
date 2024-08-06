-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.

BEGIN;
CREATE TYPE "adsType_new" AS ENUM ('HOME', 'POD', 'SHOP','STORE');
ALTER TABLE "Promotional" ALTER COLUMN "ads_type" TYPE "adsType_new" USING ("ads_type"::text::"adsType_new");
ALTER TYPE "adsType" RENAME TO "adsType_old";
ALTER TYPE "adsType_new" RENAME TO "adsType";
DROP TYPE "adsType_old";
COMMIT;