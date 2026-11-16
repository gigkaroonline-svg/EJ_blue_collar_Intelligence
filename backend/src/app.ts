import express from 'express';
import { catalogRouter } from './routes/catalog.routes';
import { authRouter } from './routes/auth.routes';
import { workerRouter } from './routes/worker.routes';
import { uploadsRouter } from './routes/uploads.routes';
import { legalRouter } from './routes/legal.routes';
import { adminRouter } from './routes/admin.routes';
import { blogRouter } from './routes/blog.routes';
import { errorHandler } from './middleware/asyncHandler';

export const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE,OPTIONS');
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }
  next();
});

app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/api/auth', authRouter);
app.use('/api/uploads', uploadsRouter);
app.use('/api/workers', workerRouter);
app.use('/api/legal', legalRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/admin', adminRouter);
app.use('/api', catalogRouter);

app.use(errorHandler);
