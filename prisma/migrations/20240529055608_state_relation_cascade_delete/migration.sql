-- DropForeignKey
ALTER TABLE "State" DROP CONSTRAINT "State_country_id_fkey";

-- AddForeignKey
ALTER TABLE "State" ADD CONSTRAINT "State_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country"("country_id") ON DELETE CASCADE ON UPDATE CASCADE;
