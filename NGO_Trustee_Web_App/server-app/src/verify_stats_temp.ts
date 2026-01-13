import 'dotenv/config';
import { getDashboardStats } from './modules/admin/admin.service';
import { prisma } from './utils/db';

async function main() {
    try {
        console.log('Fetching dashboard stats...');
        const stats = await getDashboardStats();

        console.log('Success! Stats received:');
        console.log('Volunteers:', stats.volunteers);
        console.log('Funds:', stats.funds);
        console.log('Certificates:', stats.certificates);

        if (stats.users) {
            console.log('Users found:', stats.users.length);
            if (stats.users.length > 0) {
                console.log('First user sample:', JSON.stringify(stats.users[0], null, 2));
            } else {
                console.log('No users found (excluding admins).');
            }
        } else {
            console.error('ERROR: "users" field is missing from the response!');
        }

    } catch (error) {
        console.error('Error fetching stats:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
