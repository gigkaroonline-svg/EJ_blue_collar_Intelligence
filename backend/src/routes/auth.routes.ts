import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { SourcingPartner } from '../models';
import { asyncHandler, AppError } from '../middleware/asyncHandler';
import { requireAuth } from '../middleware/auth';
import { createOtp, verifyOtp } from '../services/otp';
import { env } from '../config/env';

export const authRouter = Router();

const ROLES = ['csc', 'cmc', 'anganwadi', 'gov_ngo'] as const;

const PROFILE_REQUIRED: Record<(typeof ROLES)[number], string[]> = {
  csc: ['vleId', 'kioskName'],
  cmc: ['mobilizerId', 'agencyOrPartnerName'],
  anganwadi: ['awcCode', 'centerName'],
  gov_ngo: ['organizationName', 'designation'],
};

function isTenDigitPhone(phone: unknown): phone is string {
  return typeof phone === 'string' && /^\d{10}$/.test(phone);
}

authRouter.post(
  '/signup',
  asyncHandler(async (req, res) => {
    const {
      role, fullName, phoneNumber, email, state, district, subDistrict, pincode, profile,
    } = req.body ?? {};

    if (!ROLES.includes(role)) {
      throw new AppError(400, 'Invalid role', 'validation_error', { role: 'invalid_role' });
    }
    if (typeof fullName !== 'string' || !fullName.trim()) {
      throw new AppError(400, 'fullName is required', 'validation_error', { fullName: 'missing_field' });
    }
    if (!isTenDigitPhone(phoneNumber)) {
      throw new AppError(400, 'phoneNumber must be 10 digits', 'validation_error', { phoneNumber: 'invalid_phone' });
    }
    if (typeof email !== 'string' || !email.trim()) {
      throw new AppError(400, 'email is required', 'validation_error', { email: 'missing_field' });
    }
    if (typeof state !== 'string' || !state.trim()) {
      throw new AppError(400, 'state is required', 'validation_error', { state: 'missing_field' });
    }
    if (typeof district !== 'string' || !district.trim()) {
      throw new AppError(400, 'district is required', 'validation_error', { district: 'missing_field' });
    }
    if (typeof pincode !== 'string' || !pincode.trim()) {
      throw new AppError(400, 'pincode is required', 'validation_error', { pincode: 'missing_field' });
    }
    if (!profile || typeof profile !== 'object') {
      throw new AppError(400, 'profile is required', 'validation_error', { profile: 'missing_field' });
    }

    for (const key of PROFILE_REQUIRED[role as (typeof ROLES)[number]]) {
      const val = (profile as Record<string, unknown>)[key];
      if (typeof val !== 'string' || !val.trim()) {
        throw new AppError(400, `profile.${key} is required`, 'validation_error', {
          [`profile.${key}`]: 'missing_field',
        });
      }
    }

    const emailNorm = email.trim().toLowerCase();
    const byPhone = await SourcingPartner.findOne({ phoneNumber });
    if (byPhone) {
      throw new AppError(409, 'Phone number already registered', 'duplicate_phone');
    }
    const byEmail = await SourcingPartner.findOne({ email: emailNorm });
    if (byEmail) {
      throw new AppError(409, 'Email already registered', 'duplicate_email');
    }

    try {
      await SourcingPartner.create({
        role,
        fullName: fullName.trim(),
        phoneNumber,
        email: emailNorm,
        status: 'pending',
        state: state.trim(),
        district: district.trim(),
        subDistrict: typeof subDistrict === 'string' ? subDistrict.trim() : undefined,
        pincode: pincode.trim(),
        profile,
      });
    } catch (err: any) {
      if (err?.code === 11000) {
        if (err?.keyPattern?.email) {
          throw new AppError(409, 'Email already registered', 'duplicate_email');
        }
        throw new AppError(409, 'Phone number already registered', 'duplicate_phone');
      }
      throw err;
    }

    await createOtp(phoneNumber, 'signup');
    res.status(201).json({ message: 'Signup successful. Verify the OTP sent to your phone.' });
  }),
);

authRouter.post(
  '/request-otp',
  asyncHandler(async (req, res) => {
    const { phoneNumber } = req.body ?? {};
    // Same response whether or not the phone exists (and if createOtp rate-limits).
    if (isTenDigitPhone(phoneNumber)) {
      const partner = await SourcingPartner.findOne({ phoneNumber });
      if (partner) {
        try {
          await createOtp(phoneNumber, 'login');
        } catch {
          /* keep response generic */
        }
      }
    }
    res.json({ message: 'If this number is registered, an OTP has been sent.' });
  }),
);

authRouter.post(
  '/verify-otp',
  asyncHandler(async (req, res) => {
    const { phoneNumber, otp, purpose } = req.body ?? {};
    if (!isTenDigitPhone(phoneNumber)) {
      throw new AppError(400, 'phoneNumber must be 10 digits', 'validation_error', { phoneNumber: 'invalid_phone' });
    }
    if (typeof otp !== 'string' || !otp.trim()) {
      throw new AppError(400, 'otp is required', 'validation_error', { otp: 'missing_field' });
    }
    if (purpose !== 'signup' && purpose !== 'login') {
      throw new AppError(400, 'purpose must be signup or login', 'validation_error', { purpose: 'missing_field' });
    }

    await verifyOtp(phoneNumber, purpose, otp.trim());

    const partner = await SourcingPartner.findOne({ phoneNumber });
    // Do not reveal whether the phone is registered.
    if (!partner) throw new AppError(400, 'Invalid or expired OTP', 'otp_invalid');

    const token = jwt.sign(
      { sub: partner.id, role: partner.role },
      env.jwtSecret,
      { expiresIn: '7d' },
    );

    res.json({
      token,
      partner: {
        id: partner.id,
        role: partner.role,
        fullName: partner.fullName,
        status: partner.status,
      },
    });
  }),
);

authRouter.get(
  '/me',
  requireAuth,
  asyncHandler(async (req, res) => {
    const p = req.partner!;
    res.json({
      id: p.id,
      role: p.role,
      fullName: p.fullName,
      phoneNumber: p.phoneNumber,
      email: p.email,
      status: p.status,
      state: p.state,
      district: p.district,
      pincode: p.pincode,
      rejectionReason: p.rejectionReason,
      profile: p.profile ?? {},
    });
  }),
);
