-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'MANAGER', 'VOLUNTEER', 'DONOR');

-- CreateEnum
CREATE TYPE "VolunteerStatus" AS ENUM ('PENDING', 'ACTIVE', 'INACTIVE', 'BLOCKED');

-- CreateEnum
CREATE TYPE "MembershipStatus" AS ENUM ('UNPAID', 'PAID', 'EXEMPTED');

-- CreateEnum
CREATE TYPE "CertificateType" AS ENUM ('APPRECIATION', 'PARTICIPATION', 'ACHIEVEMENT', 'TRAINING', 'CUSTOM');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'VOLUNTEER',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_blocked" BOOLEAN NOT NULL DEFAULT false,
    "blocked_reason" TEXT,
    "blocked_by_id" TEXT,
    "blocked_at" TIMESTAMP(3),
    "last_login" TIMESTAMP(3),
    "password_reset_token" TEXT,
    "password_reset_expires" TIMESTAMP(3),
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "volunteers" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "unique_id" TEXT,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "profile_photo" TEXT,
    "bio" TEXT,
    "skills" JSONB,
    "availability" TEXT,
    "motivation" TEXT,
    "emergency_contact" JSONB,
    "status" "VolunteerStatus" NOT NULL DEFAULT 'PENDING',
    "membership_status" "MembershipStatus" NOT NULL DEFAULT 'UNPAID',
    "membership_amount" DECIMAL(10,2),
    "membership_paid_date" TIMESTAMP(3),
    "membership_receipt_url" TEXT,
    "id_card_number" TEXT,
    "id_card_url" TEXT,
    "id_card_qr_code" TEXT,
    "id_card_issued_date" TIMESTAMP(3),
    "id_card_status" TEXT DEFAULT 'active',
    "approval_date" TIMESTAMP(3),
    "join_date" TIMESTAMP(3),
    "activated_manually" BOOLEAN NOT NULL DEFAULT false,
    "activated_by_id" TEXT,
    "public_profile" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "volunteers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manager_permissions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "can_add_volunteers" BOOLEAN NOT NULL DEFAULT false,
    "can_delete_volunteers" BOOLEAN NOT NULL DEFAULT false,
    "can_block_users" BOOLEAN NOT NULL DEFAULT false,
    "can_view_transactions" BOOLEAN NOT NULL DEFAULT false,
    "can_view_receipts" BOOLEAN NOT NULL DEFAULT false,
    "can_generate_certificates" BOOLEAN NOT NULL DEFAULT false,
    "can_send_messages" BOOLEAN NOT NULL DEFAULT false,
    "can_create_campaigns" BOOLEAN NOT NULL DEFAULT false,
    "can_edit_notices" BOOLEAN NOT NULL DEFAULT false,
    "can_approve_volunteers" BOOLEAN NOT NULL DEFAULT false,
    "assigned_by_id" TEXT,
    "assigned_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "manager_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaigns" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "goal_amount" DECIMAL(10,2) NOT NULL,
    "raised_amount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'active',
    "banner_image" TEXT,
    "gallery_images" JSONB,
    "created_by_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "campaigns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "donations" (
    "id" TEXT NOT NULL,
    "donor_name" TEXT,
    "donor_email" TEXT,
    "donor_phone" TEXT,
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "payment_method" TEXT,
    "payment_id" TEXT,
    "transaction_id" TEXT,
    "campaign_id" TEXT,
    "user_id" TEXT,
    "is_anonymous" BOOLEAN NOT NULL DEFAULT false,
    "receipt_url" TEXT,
    "certificate_url" TEXT,
    "certificate_id" TEXT,
    "status" TEXT NOT NULL DEFAULT 'completed',
    "is_recurring" BOOLEAN NOT NULL DEFAULT false,
    "recurring_frequency" TEXT,
    "tax_exemption_claimed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "donations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "certificate_templates" (
    "id" TEXT NOT NULL,
    "template_name" TEXT NOT NULL,
    "template_type" "CertificateType" NOT NULL,
    "design_url" TEXT,
    "template_fields" JSONB,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_by_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "certificate_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "certificates" (
    "id" TEXT NOT NULL,
    "certificate_number" TEXT NOT NULL,
    "recipient_volunteer_id" TEXT,
    "recipient_name" TEXT,
    "recipient_email" TEXT,
    "template_id" TEXT NOT NULL,
    "certificate_type" TEXT NOT NULL,
    "issued_for" TEXT,
    "certificate_url" TEXT NOT NULL,
    "field_values" JSONB,
    "issued_by_id" TEXT,
    "issue_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "certificates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "sender_id" TEXT NOT NULL,
    "recipient_type" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "priority" TEXT NOT NULL DEFAULT 'normal',
    "send_email" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message_recipients" (
    "id" TEXT NOT NULL,
    "message_id" TEXT NOT NULL,
    "recipient_id" TEXT NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "read_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "message_recipients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notices" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "notice_type" TEXT NOT NULL,
    "target_audience" TEXT NOT NULL,
    "attachments" JSONB,
    "views_count" INTEGER NOT NULL DEFAULT 0,
    "expiry_date" TIMESTAMP(3),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "published_by_id" TEXT NOT NULL,
    "published_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "action" TEXT NOT NULL,
    "entity_type" TEXT NOT NULL,
    "entity_id" TEXT,
    "action_details" JSONB,
    "old_values" JSONB,
    "new_values" JSONB,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "volunteer_tasks" (
    "id" TEXT NOT NULL,
    "volunteer_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "due_date" TIMESTAMP(3),
    "completed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "volunteer_tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transparency_reports" (
    "id" TEXT NOT NULL,
    "report_type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "financial_year" TEXT,
    "file_url" TEXT NOT NULL,
    "published_by_id" TEXT NOT NULL,
    "published_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transparency_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "files" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "uploaded_by_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "volunteers_user_id_key" ON "volunteers"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "volunteers_unique_id_key" ON "volunteers"("unique_id");

-- CreateIndex
CREATE UNIQUE INDEX "volunteers_email_key" ON "volunteers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "volunteers_id_card_number_key" ON "volunteers"("id_card_number");

-- CreateIndex
CREATE UNIQUE INDEX "manager_permissions_user_id_key" ON "manager_permissions"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "donations_transaction_id_key" ON "donations"("transaction_id");

-- CreateIndex
CREATE UNIQUE INDEX "donations_certificate_id_key" ON "donations"("certificate_id");

-- CreateIndex
CREATE UNIQUE INDEX "certificates_certificate_number_key" ON "certificates"("certificate_number");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_blocked_by_id_fkey" FOREIGN KEY ("blocked_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "volunteers" ADD CONSTRAINT "volunteers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manager_permissions" ADD CONSTRAINT "manager_permissions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_certificate_id_fkey" FOREIGN KEY ("certificate_id") REFERENCES "certificates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certificates" ADD CONSTRAINT "certificates_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "certificate_templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certificates" ADD CONSTRAINT "certificates_recipient_volunteer_id_fkey" FOREIGN KEY ("recipient_volunteer_id") REFERENCES "volunteers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certificates" ADD CONSTRAINT "certificates_issued_by_id_fkey" FOREIGN KEY ("issued_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_recipients" ADD CONSTRAINT "message_recipients_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "messages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_recipients" ADD CONSTRAINT "message_recipients_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notices" ADD CONSTRAINT "notices_published_by_id_fkey" FOREIGN KEY ("published_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "volunteer_tasks" ADD CONSTRAINT "volunteer_tasks_volunteer_id_fkey" FOREIGN KEY ("volunteer_id") REFERENCES "volunteers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transparency_reports" ADD CONSTRAINT "transparency_reports_published_by_id_fkey" FOREIGN KEY ("published_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_uploaded_by_id_fkey" FOREIGN KEY ("uploaded_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
