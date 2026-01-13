import { prisma } from '../../utils/db';
import { AppError } from '../../middleware/error';

export const getDonorIdCard = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user) throw new AppError('User not found', 404);

    // Generate specific ID card details
    // using user.id or a combination for unique member ID if username is missing
    const memberId = user.username || `DONOR-${user.id.substring(0, 8).toUpperCase()}`;

    // QR Code URL (using a public API for now, consistent with mock data approach but dynamic)
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${memberId}`;

    return {
        memberId,
        name: user.full_name || 'Valued Donor',
        email: user.email,
        memberType: 'Donor', // Fixed type since we are in donor module
        validFrom: user.created_at,
        validUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // Valid for 1 year from now (or could be infinite)
        bloodGroup: 'Not Set', // Placeholder as per constraint
        qrCode: qrCodeUrl,
        profilePhoto: null, // User model doesn't have profile photo url consistently in base schema usually, or check if it does
    };
};
