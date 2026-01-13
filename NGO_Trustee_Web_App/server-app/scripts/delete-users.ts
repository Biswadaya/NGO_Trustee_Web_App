import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('⚠️  WARNING: This will delete ALL users and related data (Cascading).');
    console.log('Starting deletion in 5 seconds...');

    await new Promise(resolve => setTimeout(resolve, 5000));

    try {
        console.log('Running TRUNCATE on users table...');
        // Using TRUNCATE with CASCADE to remove all dependent records efficiently
        await prisma.$executeRawUnsafe('TRUNCATE TABLE "users" CASCADE;');
        console.log('✅ Successfully deleted all users and related data.');
    } catch (error) {
        console.error('❌ Error deleting users:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
