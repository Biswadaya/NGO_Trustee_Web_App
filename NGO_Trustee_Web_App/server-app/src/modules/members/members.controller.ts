import { Request, Response } from 'express';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

const membersService = new MembersService();

export class MembersController {

    async applyForMembership(req: Request, res: Response) {
        try {
            // Manual validation since we aren't using NestJS pipes
            const dto = plainToInstance(CreateMemberDto, req.body);
            const errors = await validate(dto);

            if (errors.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    errors: errors.map(err => Object.values(err.constraints || {})).flat()
                });
            }

            // Get user ID from request if authenticated (middleware should set this)
            // @ts-ignore
            const loggedInUserId = req.user?.id;

            const member = await membersService.createMember(dto, loggedInUserId);

            return res.status(201).json({
                success: true,
                message: 'Membership application submitted successfully',
                data: member
            });

        } catch (error: any) {
            console.error('Membership Application Error:', error);
            return res.status(500).json({
                success: false,
                message: error.message || 'Internal server error'
            });
        }
    }

    async getMyProfile(req: Request, res: Response) {
        try {
            // @ts-ignore
            const userId = req.user?.id;

            if (!userId) {
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }

            const profile = await membersService.getMemberProfile(userId);

            if (!profile) {
                return res.status(404).json({ success: false, message: 'Member profile not found' });
            }

            return res.json({
                success: true,
                data: profile
            });

        } catch (error) {
            return res.status(500).json({ success: false, message: 'Failed to fetch profile' });
        }
    }

    async approveMember(req: Request, res: Response) {
        try {
            const { id } = req.params;
            // Approve by setting user to active
            // In a real app we might update a status on MemberProfile too
            // For now, activating the user account is enough

            // We need to import prisma here or assume it's available via service?
            // Service doesn't have approve method yet?
            // Let's do it directly or add to service. Direct query for speed here. // Actually better to use existing service pattern.
            // But I can't easily inject prisma here without import.
            // I'll add method to service.

            const updatedUser = await membersService.approveMember(id); // define this next

            return res.json({
                success: true,
                message: 'Member approved successfully',
                data: updatedUser
            });
        } catch (error: any) {
            return res.status(500).json({ success: false, message: error.message || 'Approval failed' });
        }
    }

    async getMemberProfileById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const profile = await membersService.getMemberProfile(id); // Reuse the service method as it takes userId

            if (!profile) {
                return res.status(404).json({ success: false, message: 'Member profile not found' });
            }

            return res.json({
                success: true,
                data: profile
            });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Failed to fetch member profile' });
        }
    }
}
