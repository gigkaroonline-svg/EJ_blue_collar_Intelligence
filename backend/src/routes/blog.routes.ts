import { Router } from 'express';
import { Blog } from '../models';
import { asyncHandler, AppError } from '../middleware/asyncHandler';

export const blogRouter = Router();

function serialize(
  post: InstanceType<typeof Blog>,
  opts: { includeBody?: boolean } = {},
) {
  const o = post.toObject();
  return {
    id: String(o._id),
    slug: o.slug,
    title: o.title,
    excerpt: o.excerpt,
    body: opts.includeBody ? o.body : '',
    coverUrl: o.coverUrl || '',
    coverAlt: o.coverAlt || '',
    authorName: o.authorName || 'RojMitra',
    authorUrl: o.authorUrl || '',
    metaDescription: o.metaDescription || '',
    status: o.status,
    publishedAt: o.publishedAt ? new Date(o.publishedAt).toISOString() : null,
    updatedAt: o.updatedAt ? new Date(o.updatedAt).toISOString() : null,
  };
}

blogRouter.get(
  '/',
  asyncHandler(async (_req, res) => {
    const posts = await Blog.find({ status: 'published' }).sort({
      publishedAt: -1,
      createdAt: -1,
    });
    res.json({ posts: posts.map((p) => serialize(p)) });
  }),
);

blogRouter.get(
  '/:slug',
  asyncHandler(async (req, res) => {
    const post = await Blog.findOne({
      slug: String(req.params.slug || '').toLowerCase(),
      status: 'published',
    });
    if (!post) throw new AppError(404, 'Post not found', 'not_found');
    res.json({ post: serialize(post, { includeBody: true }) });
  }),
);
