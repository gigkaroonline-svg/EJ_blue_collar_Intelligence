import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { requireAuth, requireAccepted } from '../middleware/auth';
import * as worker from '../controllers/worker.controller';

export const workerRouter = Router();

workerRouter.use(requireAuth, requireAccepted);

workerRouter.post('/', asyncHandler(worker.createWorker));
workerRouter.get('/', asyncHandler(worker.listWorkers));
workerRouter.get('/:id', asyncHandler(worker.getWorker));
workerRouter.patch('/:id', asyncHandler(worker.updateWorker));
workerRouter.patch('/:id/availability', asyncHandler(worker.updateAvailability));
