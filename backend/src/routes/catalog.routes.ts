import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { requireAuth, requireAccepted } from '../middleware/auth';
import * as catalog from '../controllers/catalog.controller';

export const catalogRouter = Router();

catalogRouter.get('/skills', asyncHandler(catalog.listSkills));
catalogRouter.get('/jobs', asyncHandler(catalog.listJobs));
catalogRouter.get('/levels', asyncHandler(catalog.listLevels));
catalogRouter.get('/companies', asyncHandler(catalog.listCompanies));

catalogRouter.post('/skills', requireAuth, requireAccepted, asyncHandler(catalog.createSkill));
catalogRouter.post('/jobs', requireAuth, requireAccepted, asyncHandler(catalog.createJob));
catalogRouter.post('/companies', requireAuth, requireAccepted, asyncHandler(catalog.createCompany));
