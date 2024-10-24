/*
  Warnings:

  - You are about to drop the column `answerId` on the `Answers` table. All the data in the column will be lost.
  - You are about to drop the column `selectedId` on the `Element` table. All the data in the column will be lost.
  - You are about to drop the column `visible` on the `Element` table. All the data in the column will be lost.
  - You are about to drop the `ElementItems` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `question` to the `Element` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Answers" DROP CONSTRAINT "Answers_answerId_fkey";

-- DropForeignKey
ALTER TABLE "ElementItems" DROP CONSTRAINT "ElementItems_eid_fkey";

-- AlterTable
ALTER TABLE "Answers" DROP COLUMN "answerId",
ADD COLUMN     "selected" INTEGER;

-- AlterTable
ALTER TABLE "Element" DROP COLUMN "selectedId",
DROP COLUMN "visible",
ADD COLUMN     "question" TEXT NOT NULL,
ADD COLUMN     "required" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "text1" TEXT,
ADD COLUMN     "text2" TEXT,
ADD COLUMN     "text3" TEXT,
ADD COLUMN     "text4" TEXT;

-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "image" TEXT;

-- DropTable
DROP TABLE "ElementItems";
