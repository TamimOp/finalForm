/*
  Warnings:

  - You are about to drop the column `selected` on the `Answers` table. All the data in the column will be lost.
  - Added the required column `fieldCount` to the `Element` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Answers" DROP COLUMN "selected",
ADD COLUMN     "selected1" INTEGER,
ADD COLUMN     "selected2" INTEGER,
ADD COLUMN     "selected3" INTEGER,
ADD COLUMN     "selected4" INTEGER,
ADD COLUMN     "text1" TEXT,
ADD COLUMN     "text2" TEXT,
ADD COLUMN     "text3" TEXT,
ADD COLUMN     "text4" TEXT;

-- AlterTable
ALTER TABLE "Element" ADD COLUMN     "fieldCount" INTEGER NOT NULL;
