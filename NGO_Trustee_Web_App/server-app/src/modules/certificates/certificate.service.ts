import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { prisma } from '../../utils/db';
import { Certificate } from '@prisma/client';

import QRCode from 'qrcode';

export const generateCertificate = async (data: any): Promise<Certificate> => {
    const { recipient_name, issued_for, template_id } = data;

    const doc = new PDFDocument({ layout: 'landscape', size: 'A4', margin: 0 });
    const fileName = `cert-${Date.now()}.pdf`;
    const filePath = path.join(__dirname, '../../../uploads', fileName);
    const logoPath = path.join(__dirname, '../../assets/logo.png'); // Ensure this logo exists

    if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }

    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // --- Design Constants ---
    const width = doc.page.width;
    const height = doc.page.height;
    const margin = 100; // Define margin here for global usage

    const colors = {
        darkTeal: '#004D40',
        accentText: '#006064',
        textBlack: '#000000',
        bgStart: '#E0F7FA',
        bgEnd: '#B2EBF2'
    };

    // --- Background (Gradient) ---
    const grad = doc.linearGradient(0, 0, width, height);
    grad.stop(0, colors.bgStart);
    grad.stop(1, colors.bgEnd);

    doc.rect(0, 0, width, height).fill(grad);

    // --- Watermark (Logo) ---
    if (fs.existsSync(logoPath)) {
        const watermarkSize = 300;
        doc.save();
        doc.opacity(0.05);
        doc.image(logoPath, (width - watermarkSize) / 2, (height - watermarkSize) / 2, { width: watermarkSize });
        doc.restore();
    }

    // --- Border ---
    const borderWidth = 2; // px
    doc.rect(0, 0, width, height)
        .lineWidth(borderWidth * 2) // Stroke is centered, so double width
        .strokeColor(colors.darkTeal)
        .stroke();

    // --- Content Container ---
    // We'll simulate the flex layout by calculating Y positions
    let yPos = 60;

    // 1. Header Logo & Title
    if (fs.existsSync(logoPath)) {
        const logoSize = 60;
        doc.image(logoPath, (width - logoSize) / 2, yPos, { width: logoSize });
        yPos += logoSize + 10;
    } else {
        yPos += 40; // Spacing if no logo
    }

    doc.font('Helvetica-Bold').fontSize(24).fillColor(colors.textBlack).text('NHRD', { align: 'center' });
    yPos += 30;

    doc.font('Helvetica-Bold').fontSize(9).fillColor(colors.textBlack).text('NATIONAL HUMAN RESOURCE DEVELOPMENT', { align: 'center', characterSpacing: 2 });
    yPos += 40;

    // 2. Presented To
    doc.font('Helvetica-Bold').fontSize(10).fillColor('#000000', 0.5).text('PRESENTED TO', { align: 'center', characterSpacing: 2 });
    yPos += 20;

    // 3. Recipient Name
    doc.font('Times-BoldItalic').fontSize(32).fillColor(colors.darkTeal).text(recipient_name, { align: 'center' });
    yPos += 40;

    // 4. Gratitude Message
    const gratitudeText = "In grateful recognition of your generous contribution towards empowering rural communities and transforming lives.";
    doc.font('Times-Italic').fontSize(14).fillColor('#000000', 0.8).text(`"${gratitudeText}"`, margin, yPos, { align: 'center', width: width - (margin * 2) });
    yPos += 50;

    // 5. Tagline
    doc.font('Helvetica-Bold').fontSize(12).fillColor('#000000', 0.6).text('TRANSFORMING RURAL ODISHA', { align: 'center', characterSpacing: 1 });
    yPos += 20;

    // 6. Separator Line
    doc.moveTo((width / 2) - 100, yPos)
        .lineTo((width / 2) + 100, yPos)
        .lineWidth(0.5)
        .opacity(0.1)
        .strokeColor('#000000')
        .stroke();
    doc.opacity(1); // Reset opacity
    yPos += 15;

    // 7. Email
    doc.font('Helvetica-Bold').fontSize(10).fillColor('#000000', 0.7).text('nhrdodisha@gmail.com', { align: 'center' });

    // --- Footer Section (Signatures & QR) ---
    const footerY = height - 120;
    // const margin = 100; // Removed duplicate declaration

    // Left: Signature
    const sigBoxX = margin + 40;
    const dateStr = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

    // Signature Box (Simulated)
    doc.rect(sigBoxX, footerY - 40, 120, 60).lineWidth(1).strokeColor('#d1d5db').stroke(); // Box
    doc.moveTo(sigBoxX, footerY + 20).lineTo(sigBoxX + 120, footerY + 20).lineWidth(1).strokeColor('#000000').stroke(); // Line

    doc.font('Helvetica-Bold').fontSize(10).fillColor('#000000').text('Authorized Signatory', sigBoxX, footerY + 25, { width: 120, align: 'center' });
    doc.font('Helvetica').fontSize(8).fillColor('#000000', 0.6).text(dateStr, sigBoxX, footerY + 38, { width: 120, align: 'center' });

    // Right: QR Code
    try {
        const qrCodeDataUrl = await QRCode.toDataURL(`verify:${recipient_name}`);
        const qrSize = 64;
        const qrX = width - margin - 40 - qrSize;

        // White bg for QR
        doc.rect(qrX - 5, footerY - 15, qrSize + 10, qrSize + 10).fill('#ffffff');
        doc.image(qrCodeDataUrl, qrX, footerY - 10, { width: qrSize });

        doc.font('Helvetica-Bold').fontSize(8).fillColor('#000000').text('Scan to verify member', qrX - 20, footerY + 60, { width: qrSize + 40, align: 'center' });

    } catch (err) {
        console.error("QR Code generation failed", err);
    }

    // --- Bottom Footer Strip ---
    const stripHeight = 35;
    doc.rect(0, height - stripHeight, width, stripHeight).fill(colors.darkTeal);

    // Disclaimer above strip
    doc.font('Helvetica').fontSize(8).fillColor('#000000', 0.6).text('This card remains the property of NHRD and must be surrendered on request. Use is a punishable offense.', 0, height - stripHeight - 15, { align: 'center', width: width });

    // Text in strip
    doc.font('Helvetica-Bold').fontSize(9).fillColor('#ffffff').text('NHRD • NATIONAL HUMANITY & DEVELOPMENT • OFFICIAL ID', 0, height - stripHeight + 12, { align: 'center', width: width, characterSpacing: 1 });


    doc.end();

    return new Promise((resolve, reject) => {
        stream.on('finish', async () => {
            // Ensure template exists to avoid FK error
            const templateId = template_id || 'nhrd-standard-v1';
            // Try to find it first
            let templateExists = await prisma.certificateTemplate.findUnique({ where: { id: templateId } });

            if (!templateExists) {
                try {
                    await prisma.certificateTemplate.create({
                        data: {
                            id: templateId,
                            template_name: 'Standard NHRD Appreciation',
                            template_type: 'APPRECIATION',
                            is_active: true
                        }
                    });
                } catch (error) {
                    // Ignore unique constraint error 
                }
            }

            const certificate = await prisma.certificate.create({
                data: {
                    certificate_type: 'APPRECIATION',
                    ...data,
                    certificate_number: `CERT-${Date.now()}`,
                    certificate_url: `${process.env.API_URL || 'http://localhost:5000'}/uploads/${fileName}`,
                    template_id: templateId
                },
            });
            resolve(certificate);
        });
        stream.on('error', reject);
    });
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
    // 1. Try to find user to get email (for Donors)
    const user = await prisma.user.findUnique({ where: { id: entityId } });
    const userEmail = user?.email;

    return prisma.certificate.findMany({
        where: {
            OR: [
                { recipient_volunteer_id: entityId }, // If entityId is actually a volunteerId
                { recipient_email: entityId }, // Direct email match (legacy/direct call)
                ...(userEmail ? [{ recipient_email: userEmail }] : []) // Match by user email
            ]
        },
        orderBy: { created_at: 'desc' }, // Good practice to order
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
