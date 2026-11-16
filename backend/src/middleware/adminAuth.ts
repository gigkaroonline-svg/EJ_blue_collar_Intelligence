import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { Admin } from '../models';
import { env } from '../config/env';
import { AppError } from './asyncHandler';

export type AuthAdmin = {
  id: string;
  name: string;
  email: string;
};

declare global {
  namespace Express {
    interface Request {
      admin?: AuthAdmin;
    }
  }
}

export function toAuthAdmin(admin: InstanceType<typeof Admin>): AuthAdmin {
  return { id: admin.id, name: admin.name, email: admin.email };
}

export const requireAdmin: RequestHandler = async (req, _res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
      throw new AppError(401, 'Unauthorized', 'unauthorized');
    }
    const payload = jwt.verify(header.slice(7), env.jwtSecret) as { sub?: string; typ?: string };
    if (!payload.sub || payload.typ !== 'admin') {
      throw new AppError(401, 'Unauthorized', 'unauthorized');
    }
    const admin = await Admin.findById(payload.sub);
    if (!admin) throw new AppError(401, 'Unauthorized', 'unauthorized');
    req.admin = toAuthAdmin(admin);
    next();
  } catch (err: unknown) {
    if (err instanceof AppError) return next(err);
    next(new AppError(401, 'Unauthorized', 'unauthorized'));
  }
};
