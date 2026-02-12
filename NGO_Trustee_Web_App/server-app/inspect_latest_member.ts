
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// async function main() {
//     try {
//         const member = await prisma.memberProfile.findFirst({
//             orderBy: { created_at: 'desc' },
//             include: { user: true }
//         });
//         console.log("Writing to member_dump.json...");
//         const fs = require('fs');
//         fs.writeFileSync('member_dump.json', JSON.stringify(member, null, 2));
//         // console.log("Done.");
//     } catch (error) {
//         console.error(error);
//     } finally {
//         await prisma.$disconnect();
//     }
// }

// main();
