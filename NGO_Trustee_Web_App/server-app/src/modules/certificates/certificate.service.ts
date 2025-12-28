import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { prisma } from '../../utils/db';

export const generateCertificate = async (data: any) => {
    const { recipient_name, issued_for, template_id } = data;

    const doc = new PDFDocument({ layout: 'landscape', size: 'A4' });
    const fileName = `cert-${Date.now()}.pdf`;
    const filePath = path.join(__dirname, '../../../uploads', fileName);

    if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }

    doc.pipe(fs.createWriteStream(filePath));

    doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40).stroke();
    doc.fontSize(30).text('CERTIFICATE OF APPRECIATION', { align: 'center' });
    doc.moveDown();
    doc.fontSize(20).text('This is to certify that', { align: 'center' });
    doc.moveDown();
    doc.fontSize(35).fillColor('blue').text(recipient_name, { align: 'center' });
    doc.fillColor('black');
    doc.moveDown();
    doc.fontSize(20).text(`Has successfully completed contributions for`, { align: 'center' });
    doc.fontSize(25).text(issued_for, { align: 'center' });
    doc.fontSize(15).text(`Date: ${new Date().toLocaleDateString()}`, 50, 500);
    doc.text('Signature: ________________', 550, 500);
    doc.end();

    const certificate = await prisma.certificate.create({
        data: {
            ...data,
            certificate_number: `CERT-${Date.now()}`,
            certificate_url: `/uploads/${fileName}`,
            template_id: template_id || 'default-uuid-placeholder'
        },
    });

    return certificate;
};

export const createCertificate = async (data: any) => {
    return prisma.certificate.create({
        data: {
            ...data,
            certificate_number: `CERT-${Date.now()}`,
        }
    });
};

export const getCertificates = async () => {
    return prisma.certificate.findMany({
        orderBy: { created_at: 'desc' },
        include: { recipient_volunteer: true, template: true }
    });
};

export const getEntityCertificates = async (entityId: string) => {
    return prisma.certificate.findMany({
        where: {
            OR: [
                { recipient_volunteer_id: entityId },
                { recipient_email: entityId }
            ]
        },
        include: { template: true }
    });
};

export const generateForDonation = async (donationId: string) => {
    const donation = await prisma.donation.findUnique({
        where: { id: donationId },
        include: { user: true, campaign: true }
    });

    if (!donation) throw new Error('Donation not found');

    // Only generate for authenticated users with a valid user_id
    if (!donation.user_id) return null;

    const recipientName = donation.user?.username || donation.donor_name || 'Valued Donor';
    const campaignTitle = donation.campaign?.title || 'General Fund';

    // Generate PDF and DB record
    const certificate = await generateCertificate({
        recipient_name: recipientName,
        recipient_email: donation.user?.email || donation.donor_email,
        issued_for: `Donation to ${campaignTitle}`,
        certificate_type: 'APPRECIATION',
        template_id: 'default-donation-template', // In real app, fetch active template
        field_values: { amount: donation.amount }
    });

    // Link back to donation
    await prisma.donation.update({
        where: { id: donationId },
        data: {
            certificate_id: certificate.id,
            certificate_url: certificate.certificate_url
        }
    });

    return certificate;
};
