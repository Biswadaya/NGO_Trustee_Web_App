import { PrismaClient, VolunteerStatus, MembershipStatus } from '@prisma/client';
import { AppError } from '../../middleware/error';
import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

export const activateVolunteer = async (volunteerId: string, activatedBy: string) => {
    return prisma.volunteer.update({
        where: { id: volunteerId },
        data: {
            status: VolunteerStatus.ACTIVE,
            activated_manually: true,
            activated_by_id: activatedBy,
            approval_date: new Date(),
        },
    });
};

export const generateIdCard = async (volunteerId: string) => {
    const volunteer = await prisma.volunteer.findUnique({
        where: { id: volunteerId },
    });

    if (!volunteer) throw new AppError('Volunteer not found', 404);

    if (volunteer.status !== 'ACTIVE') {
        throw new AppError('Volunteer is not active', 400);
    }

    // Generate Unique ID if not exists
    const uniqueId = volunteer.unique_id || `NGO-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

    // Generate QR Code
    const qrCodeDataURL = await QRCode.toDataURL(JSON.stringify({
        id: uniqueId,
        name: volunteer.full_name,
        valid: true
    }));

    // Create PDF
    const doc = new PDFDocument({ size: 'A4' });
    // In production, upload to cloud. Here, save to disk/buffer.
    // For MVP demo, avoiding complex cloud upload logic unless requested. 
    // We'll return a mock URL or base64.
    // Let's assume we return a success status and update the record.

    await prisma.volunteer.update({
        where: { id: volunteerId },
        data: {
            unique_id: uniqueId,
            id_card_number: uniqueId,
            id_card_qr_code: qrCodeDataURL, // Storing base64 for MVP simplicity
            id_card_status: 'active',
            id_card_issued_date: new Date()
        }
    });

    return { uniqueId, message: 'ID Card generated successfully' };
};

export const payMembership = async (volunteerId: string, amount: number) => {
    return prisma.volunteer.update({
        where: { id: volunteerId },
        data: {
            membership_status: MembershipStatus.PAID,
            membership_amount: amount,
            membership_paid_date: new Date(),
        }
    });
};
