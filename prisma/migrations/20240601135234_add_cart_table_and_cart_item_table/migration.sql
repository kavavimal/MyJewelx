-- CreateTable
CREATE TABLE "Cart" (
    "cart_id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "cart_total" DOUBLE PRECISION NOT NULL,
    "discount" TEXT NOT NULL,
    "discount_type" TEXT NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("cart_id")
);

-- CreateTable
CREATE TABLE "CartItem" (
    "cartItem_id" SERIAL NOT NULL,
    "cart_id" INTEGER NOT NULL,
    "variation_id" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("cartItem_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cart_user_id_key" ON "Cart"("user_id");

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "Cart"("cart_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_variation_id_fkey" FOREIGN KEY ("variation_id") REFERENCES "ProductVariation"("variation_id") ON DELETE CASCADE ON UPDATE CASCADE;
