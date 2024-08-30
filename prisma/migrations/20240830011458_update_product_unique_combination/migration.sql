/*
  Warnings:

  - A unique constraint covering the columns `[product,growerId,categoryId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Product_product_key";

-- CreateIndex
CREATE UNIQUE INDEX "Product_product_growerId_categoryId_key" ON "Product"("product", "growerId", "categoryId");
