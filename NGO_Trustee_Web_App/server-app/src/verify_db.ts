
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        // Check Users with VOLUNTEER role
        const volunteerUsers = await prisma.user.findMany({
            where: { role: 'VOLUNTEER' },
            select: { id: true, email: true, full_name: true }
        });
        console.log(`\n--- USERS with role VOLUNTEER (${volunteerUsers.length}) ---`);
        console.log(JSON.stringify(volunteerUsers, null, 2));

        // Check Volunteer Table
        const allVolunteers = await prisma.volunteer.findMany({
            select: { id: true, status: true, user_id: true, full_name: true }
        });
        console.log(`\n--- ALL VOLUNTEER RECORDS (${allVolunteers.length}) ---`);
        console.log(JSON.stringify(allVolunteers, null, 2));

        // Check Campaign Table
        const allCampaigns = await prisma.campaign.findMany({
            select: { id: true, title: true, status: true }
        });
        console.log(`\n--- ALL CAMPAIGN RECORDS (${allCampaigns.length}) ---`);
        console.log(JSON.stringify(allCampaigns, null, 2));

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
