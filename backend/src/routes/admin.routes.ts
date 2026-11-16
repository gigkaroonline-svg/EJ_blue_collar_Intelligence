import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { requireAdmin } from '../middleware/adminAuth';
import { adminBlogRouter } from './adminBlog.routes';
import * as admin from '../controllers/admin.controller';

export const adminRouter = Router();

adminRouter.post('/auth/login', asyncHandler(admin.login));
adminRouter.get('/auth/me', requireAdmin, asyncHandler(admin.me));

adminRouter.use(requireAdmin);
adminRouter.use('/blogs', adminBlogRouter);

// TODO(admin): create sourcing partners from admin — deferred. Signup stays on the partner app.

adminRouter.get('/partners', asyncHandler(admin.listPartners));
adminRouter.patch('/partners/:id', asyncHandler(admin.updatePartner));
adminRouter.patch('/partners/:id/block', asyncHandler(admin.blockPartner));

adminRouter.get('/companies', asyncHandler(admin.listCompanies));
adminRouter.post('/companies', asyncHandler(admin.createCompany));
adminRouter.patch('/companies/:id', asyncHandler(admin.updateCompany));
adminRouter.patch('/companies/:id/block', asyncHandler(admin.blockCompany));

adminRouter.get('/workers', asyncHandler(admin.listWorkers));
adminRouter.patch('/workers/:id', asyncHandler(admin.updateWorker));

adminRouter.get('/jobs', asyncHandler(admin.listJobs));
adminRouter.post('/jobs', asyncHandler(admin.createJob));
adminRouter.patch('/jobs/:id', asyncHandler(admin.updateJob));

adminRouter.get('/skills', asyncHandler(admin.listSkills));
