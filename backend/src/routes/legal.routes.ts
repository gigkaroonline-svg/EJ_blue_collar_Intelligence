import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { getLegalDocumentBySlug } from '../controllers/legal.controller';

export const legalRouter = Router();

legalRouter.get('/:slug', asyncHandler(getLegalDocumentBySlug));
