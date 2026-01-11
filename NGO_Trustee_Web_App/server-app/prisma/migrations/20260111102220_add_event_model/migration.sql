-- CreateTable
CREATE TABLE "member_profiles" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "bank_name" TEXT NOT NULL,
    "account_number" TEXT NOT NULL,
    "ifsc_code" TEXT NOT NULL,
    "branch_name" TEXT,
    "account_type" TEXT NOT NULL,
    "nominee_name" TEXT NOT NULL,
    "nominee_relation" TEXT NOT NULL,
    "nominee_dob" TIMESTAMP(3),
    "nominee_phone" TEXT,
    "nominee_address" TEXT,
    "nominee_bank_name" TEXT,
    "nominee_account_number" TEXT,
    "nominee_ifsc_code" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "member_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "family_members" (
    "id" TEXT NOT NULL,
    "member_id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "dob" TIMESTAMP(3),
    "occupation" TEXT,
    "is_dependent" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "family_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT,
    "location" TEXT,
    "category" TEXT,
    "capacity" INTEGER NOT NULL DEFAULT 100,
    "registered" INTEGER NOT NULL DEFAULT 0,
    "is_free" BOOLEAN NOT NULL DEFAULT true,
    "image_url" TEXT,
    "attachments" JSONB,
    "created_by_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "member_profiles_user_id_key" ON "member_profiles"("user_id");

-- AddForeignKey
ALTER TABLE "member_profiles" ADD CONSTRAINT "member_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "family_members" ADD CONSTRAINT "family_members_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "member_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
