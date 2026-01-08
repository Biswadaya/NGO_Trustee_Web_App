-- CreateTable
CREATE TABLE "volunteer_groups" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "volunteer_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_VolunteerGroups" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "volunteer_groups_name_key" ON "volunteer_groups"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_VolunteerGroups_AB_unique" ON "_VolunteerGroups"("A", "B");

-- CreateIndex
CREATE INDEX "_VolunteerGroups_B_index" ON "_VolunteerGroups"("B");

-- AddForeignKey
ALTER TABLE "_VolunteerGroups" ADD CONSTRAINT "_VolunteerGroups_A_fkey" FOREIGN KEY ("A") REFERENCES "volunteers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VolunteerGroups" ADD CONSTRAINT "_VolunteerGroups_B_fkey" FOREIGN KEY ("B") REFERENCES "volunteer_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
