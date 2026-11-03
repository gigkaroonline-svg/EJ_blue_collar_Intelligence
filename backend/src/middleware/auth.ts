import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { SourcingPartner } from '../models';
import { env } from '../config/env';
import { AppError } from './asyncHandler';

export type AuthPartner = {
  id: string;
  role: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  status: string;
  state?: string;
  district?: string;
  pincode?: string;
  rejectionReason?: string;
  profile?: Record<string, unknown>;
};

declare global {
  namespace Express {
    interface Request {
      partner?: AuthPartner;
    }
  }
}

export const requireAuth: RequestHandler = async (req, _res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
      throw new AppError(401, 'Unauthorized', 'unauthorized');
    }

    const token = header.slice(7);
    const payload = jwt.verify(token, env.jwtSecret) as { sub?: string; role?: string };
    if (!payload.sub) throw new AppError(401, 'Unauthorized', 'unauthorized');

    const partner = await SourcingPartner.findById(payload.sub);
    if (!partner) throw new AppError(401, 'Unauthorized', 'unauthorized');

    req.partner = {
      id: partner.id,
      role: partner.role,
      fullName: partner.fullName,
      phoneNumber: partner.phoneNumber,
      email: partner.email,
      status: partner.status,
      state: partner.state ?? undefined,
      district: partner.district ?? undefined,
      pincode: partner.pincode ?? undefined,
      rejectionReason: partner.rejectionReason ?? undefined,
      profile: partner.profile && typeof partner.profile === 'object'
        ? partner.profile as Record<string, unknown>
        : undefined,
    };
    next();
  } catch (err: any) {
    if (err instanceof AppError) return next(err);
    next(new AppError(401, 'Unauthorized', 'unauthorized'));
  }
};

export const requireAccepted: RequestHandler = (req, _res, next) => {
  if (req.partner?.status !== 'accepted') {
    next(new AppError(403, 'Partner account is not accepted', 'not_accepted'));
    return;
  }
  next();
};
