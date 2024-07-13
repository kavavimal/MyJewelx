-- CreateTable
CREATE TABLE "OrderSellerRelation" (
    "order_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "OrderSellerRelation_pkey" PRIMARY KEY ("order_id","user_id")
);

-- AddForeignKey
ALTER TABLE "OrderSellerRelation" ADD CONSTRAINT "OrderSellerRelation_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderSellerRelation" ADD CONSTRAINT "OrderSellerRelation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
