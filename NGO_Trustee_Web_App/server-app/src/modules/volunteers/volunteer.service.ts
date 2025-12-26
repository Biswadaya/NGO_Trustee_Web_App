import { VolunteerStatus, MembershipStatus } from '@prisma/client';
import { AppError } from '../../middleware/error';
import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import { prisma } from '../../utils/db';


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

export const getVolunteers = async () => {
    return prisma.volunteer.findMany({
        orderBy: { created_at: 'desc' },
        include: { user: { select: { email: true, role: true } } }
    });
};

export const getVolunteerPersonalInfo = async (id: string) => {
    const volunteer = await prisma.volunteer.findUnique({
        where: { id },
        include: { user: { select: { email: true, role: true } } }
    });

    if (!volunteer) {
        throw new AppError('Volunteer not found', 404);
    }

    return volunteer;
};

export const updateVolunteerStatus = async (id: string, status: VolunteerStatus) => {
    return prisma.volunteer.update({
        where: { id },
        data: { status }
    });
};

export const getVolunteerIdCard = async (id: string) => {
    const volunteer = await prisma.volunteer.findUnique({
        where: { id },
        select: {
            id: true,
            unique_id: true,
            full_name: true,
            id_card_number: true,
            id_card_qr_code: true,
            id_card_issued_date: true,
            id_card_status: true
        }
    });

    if (!volunteer) {
        throw new AppError('Volunteer not found', 404);
    }

    return volunteer;
};

export const getAllIdCards = async () => {
    return prisma.volunteer.findMany({
        where: { id_card_number: { not: null } },
        select: {
            id: true,
            unique_id: true,
            full_name: true,
            id_card_number: true,
            id_card_issued_date: true,
            id_card_status: true
        },
        orderBy: { id_card_issued_date: 'desc' }
    });
};

export const revokeIdCard = async (id: string) => {
    return prisma.volunteer.update({
        where: { id },
        data: { id_card_status: 'revoked', status: VolunteerStatus.BLOCKED }
    });
};

export const getVolunteerUniqueId = async (id: string) => {
    const volunteer = await prisma.volunteer.findUnique({
        where: { id },
        select: { unique_id: true }
    });

    if (!volunteer) {
        throw new AppError('Volunteer not found', 404);
    }

    return volunteer.unique_id;
};

export const registerVolunteer = async (data: any) => {
    // First create user account
    const user = await prisma.user.create({
        data: {
            email: data.email,
            password_hash: 'hashed_password', // In production, properly hash the password
            role: 'VOLUNTEER'
        }
    });

    // Then create volunteer profile
    return prisma.volunteer.create({
        data: {
            user_id: user.id,
            full_name: data.full_name,
            email: data.email,
            phone: data.phone,
            bio: data.bio,
            skills: data.skills,
            availability: data.availability,
            motivation: data.motivation,
            emergency_contact: data.emergency_contact
        }
    });
};

