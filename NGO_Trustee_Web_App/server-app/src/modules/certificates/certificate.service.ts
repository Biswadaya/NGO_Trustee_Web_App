import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const generateCertificate = async (data: any) => {
    // Logic to generate PDF would go here (using pdfkit)
    // For MVP, we stub it

    const certificate = await prisma.certificate.create({
        data: {
            ...data,
            certificate_number: `CERT-${Date.now()}`,
            certificate_url: 'https://example.com/cert-placeholder.pdf',
        },
    });

    return certificate;
};

export const getCertificates = async () => {
    return prisma.certificate.findMany({
        orderBy: { created_at: 'desc' },
    });
};
