
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Checking Volunteers...');
    const volunteers = await prisma.volunteer.findMany({
        include: { tasks: true }
    });

    console.log(`Found ${volunteers.length} volunteers.`);

    volunteers.forEach(v => {
        console.log(`Volunteer: ${v.full_name} (${v.id}) - Tasks: ${v.tasks.length}`);
        v.tasks.forEach(t => {
            console.log(`  - Task: ${t.title} [${t.status}]`);
        });
    });

    console.log('Checking Tasks...');
    const tasks = await prisma.volunteerTask.findMany();
    console.log(`Total tasks in table: ${tasks.length}`);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
