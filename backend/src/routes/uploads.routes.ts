import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { requireAuth, requireAccepted } from '../middleware/auth';
import { createSignedReadUrl, createSignedUploadUrl } from '../controllers/uploads.controller';

export const uploadsRouter = Router();

uploadsRouter.use(requireAuth, requireAccepted);

uploadsRouter.post('/signed-url', asyncHandler(createSignedUploadUrl));
uploadsRouter.post('/signed-read', asyncHandler(createSignedReadUrl));
