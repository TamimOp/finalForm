/*
  Warnings:

  - You are about to drop the column `uid` on the `FormPermission` table. All the data in the column will be lost.
  - Added the required column `email` to the `FormPermission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FormPermission" DROP CONSTRAINT "FormPermission_uid_fkey";

-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "permission" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "FormPermission" DROP COLUMN "uid",
ADD COLUMN     "email" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "FormPermission" ADD CONSTRAINT "FormPermission_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;
