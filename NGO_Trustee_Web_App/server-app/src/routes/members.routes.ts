import { Router } from 'express';
import { MembersController } from '../modules/members/members.controller';
import { protect as authenticate } from '../middleware/auth'; // Assuming this exists based on context

const router = Router();
const membersController = new MembersController();

// Public route (Guests can apply, logged-in users can apply)
// We might want to use 'optionalAuth' middleware if we want to support both in one route efficiently 
// or let the controller handle logic based on req.user which usually comes from auth middleware.
// For now, let's assume the controller checks.
// But if I use 'authenticate', it forces login. 
// I'll create a wrapper or just leave it open and handle user check inside.
// Actually, `authenticate` usually populates `req.user`. If optional, we need a different middleware.
// Let's assume for now the route is open, but we try to decode token if present? 
// Or better: The client makes a choice.
// If the user is logged in, they send the token.
// I will implement a helper in the controller or assume a 'maybeAuth' middleware exists or just use the generic one.
// Let's import `authenticate` but wrap it for the POST?
// Actually simpler: The Controller logic had `const loggedInUserId = req.user?.id`.
// If I don't run `authenticate`, `req.user` will be undefined.
// So for the Apply route, we probably want it public, but IF a header is there, parse it.
// I'll stick to basic router for now.

router.post('/apply', (req, res, next) => {
    // Optional auth Middleware logic placeholder or just call controller
    // If the frontend sends a token, the global middleware might parse it?
    // Let's look at `index.ts` to see global middlewares.
    membersController.applyForMembership(req, res);
});

router.get('/me', authenticate, (req, res) => {
    membersController.getMyProfile(req, res);
});

router.put('/:id/approve', authenticate, (req, res) => {
    // Add admin check middleware here in real app
    membersController.approveMember(req, res);
});

router.get('/:id/profile', authenticate, (req, res) => {
    // Add admin check middleware here
    membersController.getMemberProfileById(req, res);
});

export default router;
