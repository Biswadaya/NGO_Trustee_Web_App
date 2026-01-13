/*
  Warnings:

  - Added the required column `membership_fee` to the `member_profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "member_profiles" ADD COLUMN     "email" TEXT,
ADD COLUMN     "is_paid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "membership_fee" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "payment_date" TIMESTAMP(3),
ADD COLUMN     "payment_reference" TEXT,
ALTER COLUMN "account_type" DROP NOT NULL,
ALTER COLUMN "account_type" DROP DEFAULT;
