/*
  Warnings:

  - Added the required column `full_name` to the `member_profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "member_profiles" ADD COLUMN     "address" TEXT,
ADD COLUMN     "full_name" TEXT NOT NULL,
ADD COLUMN     "occupation" TEXT,
ADD COLUMN     "phone" TEXT,
ALTER COLUMN "account_type" SET DEFAULT 'Savings';
