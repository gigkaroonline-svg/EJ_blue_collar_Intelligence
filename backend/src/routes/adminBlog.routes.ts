import { Router } from 'express';
import multer from 'multer';
import { Types } from 'mongoose';
import { Blog } from '../models';
import { asyncHandler, AppError } from '../middleware/asyncHandler';
import { deleteBlogCoverUrl, uploadBlogCover } from '../services/gcs';

export const adminBlogRouter = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const BODY_MAX = 20000;

function isObjectId(v: unknown): v is string {
  return typeof v === 'string' && Types.ObjectId.isValid(v);
}

function slugify(value: string) {
  const base = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
  return base || 'post';
}

async function uniqueSlug(title: string, ignoreId?: string) {
  const base = slugify(title);
  let slug = base;
  let n = 2;
  while (
    await Blog.exists({
      slug,
      ...(ignoreId ? { _id: { $ne: ignoreId } } : {}),
    })
  ) {
    slug = `${base}-${n}`;
    n += 1;
  }
  return slug;
}

function serialize(post: InstanceType<typeof Blog>) {
  const o = post.toObject();
  return {
    id: String(o._id),
    slug: o.slug,
    title: o.title,
    excerpt: o.excerpt,
    body: o.body,
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

function parseFields(body: Record<string, unknown>) {
  const title = typeof body.title === 'string' ? body.title.trim() : undefined;
  const excerpt = typeof body.excerpt === 'string' ? body.excerpt.trim() : undefined;
  const story = typeof body.body === 'string' ? body.body.trim() : undefined;
  const coverAlt = typeof body.coverAlt === 'string' ? body.coverAlt.trim() : undefined;
  const authorUrl = typeof body.authorUrl === 'string' ? body.authorUrl.trim() : undefined;
  const metaDescription =
    typeof body.metaDescription === 'string' ? body.metaDescription.trim() : undefined;
  const status: 'draft' | 'published' | undefined =
    body.status === 'draft' || body.status === 'published' ? body.status : undefined;
  return { title, excerpt, story, coverAlt, authorUrl, metaDescription, status };
}

async function coverFromRequest(req: {
  file?: Express.Multer.File;
  body?: Record<string, unknown>;
}): Promise<string | undefined> {
  if (req.file) return uploadBlogCover(req.file);
  const remove = req.body?.removeCover === '1' || req.body?.removeCover === true;
  if (remove) return '';
  if (typeof req.body?.coverUrl === 'string') return req.body.coverUrl.trim();
  return undefined;
}

adminBlogRouter.get(
  '/',
  asyncHandler(async (_req, res) => {
    const posts = await Blog.find().sort({ updatedAt: -1 });
    res.json({ posts: posts.map((p) => serialize(p)) });
  }),
);

adminBlogRouter.post(
  '/',
  upload.single('cover'),
  asyncHandler(async (req, res) => {
    const fields = parseFields(req.body ?? {});
    if (!fields.title || fields.title.length < 3 || fields.title.length > 140) {
      throw new AppError(400, 'Title must be 3–140 characters', 'validation_error');
    }
    if (!fields.excerpt || fields.excerpt.length < 20 || fields.excerpt.length > 320) {
      throw new AppError(400, 'Excerpt must be 20–320 characters', 'validation_error');
    }
    if (!fields.story || fields.story.length < 40 || fields.story.length > BODY_MAX) {
      throw new AppError(400, 'Story body is too short or too long', 'validation_error');
    }

    let coverUrl = '';
    try {
      coverUrl = (await coverFromRequest(req)) || '';
    } catch (err) {
      throw new AppError(
        400,
        err instanceof Error ? err.message : 'Could not upload the image',
        'cover_upload_failed',
      );
    }
    if (!coverUrl) {
      throw new AppError(400, 'Add a cover image for this story', 'validation_error');
    }

    const status: 'draft' | 'published' = fields.status ?? 'draft';
    const post = await Blog.create({
      title: fields.title,
      slug: await uniqueSlug(fields.title),
      excerpt: fields.excerpt,
      body: fields.story,
      coverUrl,
      coverAlt: fields.coverAlt || '',
      authorName: req.admin?.name || 'RojMitra',
      authorUrl: fields.authorUrl || '',
      metaDescription: fields.metaDescription || '',
      status,
      publishedAt: status === 'published' ? new Date() : null,
      authorAdminId: req.admin?.id,
    });
    res.status(201).json({ post: serialize(post) });
  }),
);

adminBlogRouter.patch(
  '/:id',
  upload.single('cover'),
  asyncHandler(async (req, res) => {
    if (!isObjectId(req.params.id)) throw new AppError(404, 'Post not found', 'not_found');
    const post = await Blog.findById(req.params.id);
    if (!post) throw new AppError(404, 'Post not found', 'not_found');

    const fields = parseFields(req.body ?? {});
    if (fields.title !== undefined) {
      if (fields.title.length < 3 || fields.title.length > 140) {
        throw new AppError(400, 'Title must be 3–140 characters', 'validation_error');
      }
      if (fields.title !== post.title) {
        post.title = fields.title;
        if (post.status !== 'published') {
          post.slug = await uniqueSlug(fields.title, post.id);
        }
      }
    }
    if (fields.excerpt !== undefined) {
      if (fields.excerpt.length < 20 || fields.excerpt.length > 320) {
        throw new AppError(400, 'Excerpt must be 20–320 characters', 'validation_error');
      }
      post.excerpt = fields.excerpt;
    }
    if (fields.story !== undefined) {
      if (fields.story.length < 40 || fields.story.length > BODY_MAX) {
        throw new AppError(400, 'Story body is too short or too long', 'validation_error');
      }
      post.body = fields.story;
    }
    if (fields.coverAlt !== undefined) post.coverAlt = fields.coverAlt;
    if (fields.authorUrl !== undefined) post.authorUrl = fields.authorUrl;
    if (fields.metaDescription !== undefined) post.metaDescription = fields.metaDescription;

    let uploadedCover: string | undefined;
    try {
      uploadedCover = await coverFromRequest(req);
    } catch (err) {
      throw new AppError(
        400,
        err instanceof Error ? err.message : 'Could not upload the image',
        'cover_upload_failed',
      );
    }
    if (uploadedCover !== undefined && uploadedCover !== post.coverUrl) {
      if (!uploadedCover) {
        throw new AppError(400, 'A cover image is required', 'validation_error');
      }
      await deleteBlogCoverUrl(post.coverUrl || '').catch(() => undefined);
      post.coverUrl = uploadedCover;
    }
    if (!post.coverUrl) {
      throw new AppError(400, 'A cover image is required', 'validation_error');
    }

    if (fields.status) {
      post.status = fields.status;
      if (fields.status === 'published' && !post.publishedAt) {
        post.publishedAt = new Date();
      }
    }

    await post.save();
    res.json({ post: serialize(post) });
  }),
);

adminBlogRouter.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    if (!isObjectId(req.params.id)) throw new AppError(404, 'Post not found', 'not_found');
    const post = await Blog.findByIdAndDelete(req.params.id);
    if (!post) throw new AppError(404, 'Post not found', 'not_found');
    await deleteBlogCoverUrl(post.coverUrl || '').catch(() => undefined);
    res.json({ ok: true });
  }),
);
