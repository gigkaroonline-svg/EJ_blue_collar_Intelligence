import { Schema, model } from 'mongoose';

/** Public blog posts for RojMitra landing (ported from GigKaro BlogPost). */
const blogSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, lowercase: true, unique: true },
    excerpt: { type: String, required: true, trim: true },
    body: { type: String, required: true },
    /** Public GCS URL (https://storage.googleapis.com/...). */
    coverUrl: { type: String, default: '' },
    coverAlt: { type: String, default: '' },
    authorName: { type: String, default: 'RojMitra' },
    authorUrl: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
      index: true,
    },
    publishedAt: { type: Date, default: null },
    authorAdminId: { type: Schema.Types.ObjectId, ref: 'Admin' },
  },
  { timestamps: true },
);

blogSchema.index({ status: 1, publishedAt: -1 });

export const Blog = model('Blog', blogSchema, 'blogs');
