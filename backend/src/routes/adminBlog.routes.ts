import { Router } from 'express';
import multer from 'multer';
import { asyncHandler } from '../middleware/asyncHandler';
import * as adminBlog from '../controllers/adminBlog.controller';

export const adminBlogRouter = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

adminBlogRouter.get('/', asyncHandler(adminBlog.listAdminPosts));
adminBlogRouter.post('/', upload.single('cover'), asyncHandler(adminBlog.createAdminPost));
adminBlogRouter.patch('/:id', upload.single('cover'), asyncHandler(adminBlog.updateAdminPost));
adminBlogRouter.delete('/:id', asyncHandler(adminBlog.deleteAdminPost));
