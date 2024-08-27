/*
  Warnings:

  - You are about to drop the column `icon` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `icon` on the `Grower` table. All the data in the column will be lost.
  - You are about to drop the column `icon` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `icon` on the `Strain` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "icon";

-- AlterTable
ALTER TABLE "Grower" DROP COLUMN "icon";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "icon";

-- AlterTable
ALTER TABLE "Strain" DROP COLUMN "icon";
