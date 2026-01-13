import { Router } from 'express';
import * as AuthController from './auth.controller';
import { protect } from '../../middleware/auth';

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/verify-otp', AuthController.verifyOtp);

// ... other routes if any ...

export default router;
