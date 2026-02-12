-- CreateTable
CREATE TABLE "organization_settings" (
    "id" TEXT NOT NULL,
    "org_name" TEXT NOT NULL DEFAULT 'Trust Flow',
    "contact_email" TEXT NOT NULL DEFAULT 'info@trustflow.app',
    "phone" TEXT NOT NULL DEFAULT '+91 98765 43210',
    "address" TEXT,
    "website" TEXT,
    "logo_url" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organization_settings_pkey" PRIMARY KEY ("id")
);
