/*
  Warnings:

  - Added the required column `dob` to the `member_profiles` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FundingType" AS ENUM ('CSR', 'GRANT');

-- CreateEnum
CREATE TYPE "ExpenditureCategory" AS ENUM ('EPF', 'GST', 'PROJECT_COST', 'SALARY', 'OTHER');

-- AlterTable
ALTER TABLE "member_profiles" ADD COLUMN     "adhar_number" TEXT,
ADD COLUMN     "dob" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "bank_name" DROP NOT NULL,
ALTER COLUMN "account_number" DROP NOT NULL,
ALTER COLUMN "ifsc_code" DROP NOT NULL,
ALTER COLUMN "nominee_name" DROP NOT NULL,
ALTER COLUMN "nominee_relation" DROP NOT NULL;

-- CreateTable
CREATE TABLE "funding_records" (
    "id" TEXT NOT NULL,
    "type" "FundingType" NOT NULL,
    "beneficiary_name" TEXT NOT NULL,
    "beneficiary_address" TEXT NOT NULL,
    "sanction_amount" DECIMAL(15,2) NOT NULL,
    "sanction_authority" TEXT NOT NULL,
    "project_name" TEXT NOT NULL,
    "received_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'received',
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "funding_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "investments" (
    "id" TEXT NOT NULL,
    "amount" DECIMAL(15,2) NOT NULL,
    "investment_limit" DECIMAL(15,2) NOT NULL,
    "investment_date" TIMESTAMP(3) NOT NULL,
    "period" TEXT NOT NULL,
    "rate_of_interest" DECIMAL(5,2) NOT NULL,
    "authority_name" TEXT NOT NULL,
    "organization_name" TEXT NOT NULL,
    "authority_address" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "investments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "membership_payments" (
    "id" TEXT NOT NULL,
    "member_id" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "payment_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payment_year" TEXT,
    "payment_method" TEXT,
    "receipt_url" TEXT,
    "status" TEXT NOT NULL DEFAULT 'completed',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "membership_payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expenditure_records" (
    "id" TEXT NOT NULL,
    "category" "ExpenditureCategory" NOT NULL,
    "amount" DECIMAL(15,2) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "item_name" TEXT,
    "vendor_name" TEXT,
    "invoice_number" TEXT,
    "project_name" TEXT,
    "status" TEXT NOT NULL DEFAULT 'paid',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "expenditure_records_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "membership_payments" ADD CONSTRAINT "membership_payments_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "member_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
