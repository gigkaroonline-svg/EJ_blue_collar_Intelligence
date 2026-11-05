import express from 'express';
import { catalogRouter } from './routes/catalog.routes';
import { authRouter } from './routes/auth.routes';
import { tradespersonRouter } from './routes/tradesperson.routes';
import { uploadsRouter } from './routes/uploads.routes';
import { errorHandler } from './middleware/asyncHandler';

export const app = express();
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/api/auth', authRouter);
app.use('/api/uploads', uploadsRouter);
app.use('/api/tradespeople', tradespersonRouter);
app.use('/api', catalogRouter);

app.use(errorHandler);
