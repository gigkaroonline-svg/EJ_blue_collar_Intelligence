import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { requireAuth } from '../middleware/auth';
import * as auth from '../controllers/auth.controller';

export const authRouter = Router();

authRouter.post('/signup', asyncHandler(auth.signup));
authRouter.post('/request-otp', asyncHandler(auth.requestOtp));
authRouter.post('/reset-password', asyncHandler(auth.resetPassword));
authRouter.post('/verify-otp', asyncHandler(auth.verifyPartnerOtp));
authRouter.post('/login', asyncHandler(auth.login));
authRouter.get('/me', requireAuth, asyncHandler(auth.me));
authRouter.patch('/me', requireAuth, asyncHandler(auth.updateMe));
