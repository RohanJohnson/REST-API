/*
  Warnings:

  - You are about to drop the column `uname` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "uname",
ADD COLUMN     "name" TEXT;