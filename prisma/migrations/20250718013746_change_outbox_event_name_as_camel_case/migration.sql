/*
  Warnings:

  - You are about to drop the `otp-codes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "otp-codes" DROP CONSTRAINT "otp-codes_userId_fkey";

-- DropTable
DROP TABLE "otp-codes";
