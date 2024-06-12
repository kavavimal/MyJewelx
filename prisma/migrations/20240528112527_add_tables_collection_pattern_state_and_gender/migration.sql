-- CreateTable
CREATE TABLE "Collection" (
    "collection_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("collection_id")
);

-- CreateTable
CREATE TABLE "ProductCollection" (
    "collection_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "ProductCollection_pkey" PRIMARY KEY ("collection_id","product_id")
);

-- CreateTable
CREATE TABLE "Pattern" (
    "pattern_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Pattern_pkey" PRIMARY KEY ("pattern_id")
);

-- CreateTable
CREATE TABLE "ProductPatten" (
    "pattern_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "ProductPatten_pkey" PRIMARY KEY ("pattern_id","product_id")
);

-- CreateTable
CREATE TABLE "State" (
    "state_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("state_id")
);

-- CreateTable
CREATE TABLE "ProductState" (
    "state_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "ProductState_pkey" PRIMARY KEY ("state_id","product_id")
);

-- CreateTable
CREATE TABLE "Gender" (
    "gender_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Gender_pkey" PRIMARY KEY ("gender_id")
);

-- CreateTable
CREATE TABLE "ProductGender" (
    "gender_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "ProductGender_pkey" PRIMARY KEY ("gender_id","product_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Collection_name_key" ON "Collection"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Pattern_name_key" ON "Pattern"("name");

-- CreateIndex
CREATE UNIQUE INDEX "State_name_key" ON "State"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Gender_name_key" ON "Gender"("name");

-- AddForeignKey
ALTER TABLE "ProductCollection" ADD CONSTRAINT "ProductCollection_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "Collection"("collection_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCollection" ADD CONSTRAINT "ProductCollection_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPatten" ADD CONSTRAINT "ProductPatten_pattern_id_fkey" FOREIGN KEY ("pattern_id") REFERENCES "Pattern"("pattern_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPatten" ADD CONSTRAINT "ProductPatten_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductState" ADD CONSTRAINT "ProductState_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "State"("state_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductState" ADD CONSTRAINT "ProductState_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductGender" ADD CONSTRAINT "ProductGender_gender_id_fkey" FOREIGN KEY ("gender_id") REFERENCES "Gender"("gender_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductGender" ADD CONSTRAINT "ProductGender_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;
