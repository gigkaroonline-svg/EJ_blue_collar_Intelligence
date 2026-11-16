import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { getPublishedPostBySlug, listPublishedPosts } from '../controllers/blog.controller';

export const blogRouter = Router();

blogRouter.get('/', asyncHandler(listPublishedPosts));
blogRouter.get('/:slug', asyncHandler(getPublishedPostBySlug));
