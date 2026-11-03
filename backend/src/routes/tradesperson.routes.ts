import crypto from 'crypto';
import { Router } from 'express';
import { Types } from 'mongoose';
import { Tradesperson, TradespersonAvailabilityLog, Skill, Company } from '../models';
import { asyncHandler, AppError } from '../middleware/asyncHandler';
import { requireAuth, requireAccepted } from '../middleware/auth';
import { skillDisplayName } from '../services/catalog';
import { env } from '../config/env';

export const tradespersonRouter = Router();

tradespersonRouter.use(requireAuth, requireAccepted);

function normalizeIdNumber(idNumber: string): string {
  return idNumber.trim().replace(/[\s-]/g, '').toLowerCase();
}

function hashIdentity(idNumber: string): string {
  return crypto
    .createHmac('sha256', env.identityHashSecret)
    .update(normalizeIdNumber(idNumber))
    .digest('hex');
}

function maskIdentity(idNumber: string): string {
  const n = normalizeIdNumber(idNumber);
  const last4 = n.slice(-4);
  return `${'X'.repeat(Math.max(0, n.length - 4))}${last4}`;
}

function isObjectId(v: unknown): v is string {
  return typeof v === 'string' && Types.ObjectId.isValid(v);
}

function stripIdentityHash(doc: InstanceType<typeof Tradesperson> | Record<string, unknown>) {
  const o =
    typeof (doc as any).toObject === 'function'
      ? (doc as any).toObject({ virtuals: true })
      : { ...doc };
  delete o.identityHash;
  delete o.__v;
  return o;
}

function refName(doc: any, lang?: string): { id: string; name: string } | null {
  if (!doc || !doc._id) return null;
  const id = doc.id ?? String(doc._id);
  if (doc.name != null && typeof doc.name === 'string' && !doc.names) {
    return { id, name: doc.name };
  }
  return { id, name: skillDisplayName(doc, lang) };
}

function formatTradesperson(doc: InstanceType<typeof Tradesperson>, lang?: string) {
  const o = stripIdentityHash(doc);
  if (o.primaryTrade && typeof o.primaryTrade === 'object' && o.primaryTrade._id) {
    o.primaryTrade = refName(o.primaryTrade, lang);
  }
  if (Array.isArray(o.skillIds)) {
    o.skillIds = o.skillIds
      .map((s: any) => (s && s._id ? refName(s, lang) : null))
      .filter(Boolean);
  }
  if (Array.isArray(o.workExperiences)) {
    o.workExperiences = o.workExperiences.map((ex: any) => {
      const row = { ...ex };
      if (row.companyId && row.companyId._id) row.companyId = refName(row.companyId, lang);
      if (row.skillId && row.skillId._id) row.skillId = refName(row.skillId, lang);
      return row;
    });
  }
  return o;
}

async function assertSkillIds(ids: string[]) {
  for (const id of ids) {
    if (!isObjectId(id)) {
      throw new AppError(400, `Invalid skill id: ${id}`, 'validation_error', { skillId: 'invalid_id' });
    }
    const skill = await Skill.findById(id);
    if (!skill || skill.status === 'rejected') {
      throw new AppError(400, `Invalid skill id: ${id}`, 'validation_error', { skillId: 'invalid_id' });
    }
  }
}

async function assertCompanyId(id: string) {
  if (!isObjectId(id)) {
    throw new AppError(400, `Invalid company id: ${id}`, 'validation_error', { companyId: 'invalid_id' });
  }
  const company = await Company.findById(id);
  if (!company || company.status === 'rejected') {
    throw new AppError(400, `Invalid company id: ${id}`, 'validation_error', { companyId: 'invalid_id' });
  }
}

tradespersonRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const body = req.body ?? {};
    const {
      idType, idNumber, panNumber, fullName, dateOfBirth, gender, phoneNumber,
      permanentAddress, presentSameAsPermanent, presentAddress, documents,
      registrationLocation, dailyWageExpected, primaryTrade, skillIds, workExperiences,
    } = body;

    if (typeof fullName !== 'string' || !fullName.trim()) {
      throw new AppError(400, 'fullName is required', 'validation_error', { fullName: 'missing_field' });
    }
    if (typeof idType !== 'string' || !idType.trim()) {
      throw new AppError(400, 'idType is required', 'validation_error', { idType: 'missing_field' });
    }
    if (typeof idNumber !== 'string' || !idNumber.trim()) {
      throw new AppError(400, 'idNumber is required', 'validation_error', { idNumber: 'missing_field' });
    }

    if (dailyWageExpected != null) {
      if (typeof dailyWageExpected !== 'number' || dailyWageExpected < 0) {
        throw new AppError(400, 'dailyWageExpected must be a number >= 0', 'validation_error', {
          dailyWageExpected: 'invalid_number',
        });
      }
    }

    const skillIdList: string[] = Array.isArray(skillIds) ? skillIds : [];
    await assertSkillIds(skillIdList);
    if (primaryTrade != null) {
      if (!isObjectId(primaryTrade)) {
        throw new AppError(400, 'Invalid primaryTrade', 'validation_error', { primaryTrade: 'invalid_id' });
      }
      await assertSkillIds([primaryTrade]);
    }

    const experiencesIn = Array.isArray(workExperiences) ? workExperiences : [];
    const experiences = [];
    for (const ex of experiencesIn) {
      if (!ex || typeof ex !== 'object') {
        throw new AppError(400, 'Invalid workExperiences entry', 'validation_error', {
          workExperiences: 'missing_field',
        });
      }
      await assertCompanyId(ex.companyId);
      if (ex.skillId != null) {
        if (!isObjectId(ex.skillId)) {
          throw new AppError(400, 'Invalid skillId in workExperiences', 'validation_error', {
            skillId: 'invalid_id',
          });
        }
        await assertSkillIds([ex.skillId]);
      }
      if (ex.yearsOfExperience != null) {
        if (typeof ex.yearsOfExperience !== 'number' || ex.yearsOfExperience < 0) {
          throw new AppError(400, 'yearsOfExperience must be >= 0', 'validation_error', {
            yearsOfExperience: 'invalid_number',
          });
        }
      }
      experiences.push({
        companyId: ex.companyId,
        skillId: ex.skillId,
        yearsOfExperience: ex.yearsOfExperience,
        addedBy: { partnerId: req.partner!.id, role: req.partner!.role },
      });
    }

    const identityHash = hashIdentity(idNumber);
    const maskedIdentity = maskIdentity(idNumber);

    let tradesperson;
    try {
      tradesperson = await Tradesperson.create({
        idType: idType.trim(),
        identityHash,
        maskedIdentity,
        panNumber,
        fullName: fullName.trim(),
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
        gender,
        phoneNumber,
        permanentAddress,
        presentSameAsPermanent: presentSameAsPermanent ?? false,
        presentAddress,
        documents,
        registrationLocation,
        dailyWageExpected,
        primaryTrade,
        skillIds: skillIdList,
        workExperiences: experiences,
        isReadyToWork: false,
        registeredBy: { partnerId: req.partner!.id, role: req.partner!.role },
      });
    } catch (err: any) {
      if (err?.code === 11000) {
        throw new AppError(409, 'Tradesperson already registered', 'duplicate_tradesperson');
      }
      throw err;
    }

    res.status(201).json(stripIdentityHash(tradesperson));
  }),
);

tradespersonRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const filter: Record<string, unknown> = {
      'registeredBy.partnerId': req.partner!.id,
    };
    if (typeof req.query.state === 'string' && req.query.state) {
      filter['permanentAddress.state'] = req.query.state;
    }
    if (typeof req.query.district === 'string' && req.query.district) {
      filter['permanentAddress.district'] = req.query.district;
    }
    if (req.query.isReadyToWork === 'true') filter.isReadyToWork = true;
    if (req.query.isReadyToWork === 'false') filter.isReadyToWork = false;
    if (typeof req.query.skillId === 'string' && req.query.skillId) {
      if (!isObjectId(req.query.skillId)) {
        throw new AppError(400, 'Invalid skillId', 'validation_error', { skillId: 'invalid_id' });
      }
      filter.skillIds = req.query.skillId;
    }

    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 20));
    const skip = (page - 1) * limit;

    const lang = typeof req.query.lang === 'string' ? req.query.lang : undefined;
    const [rows, total] = await Promise.all([
      Tradesperson.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('primaryTrade')
        .populate('skillIds')
        .populate('workExperiences.companyId')
        .populate('workExperiences.skillId'),
      Tradesperson.countDocuments(filter),
    ]);

    res.json({
      items: rows.map((r) => formatTradesperson(r, lang)),
      page,
      limit,
      total,
    });
  }),
);

tradespersonRouter.get(
  '/:id',
  asyncHandler(async (req, res) => {
    if (!isObjectId(req.params.id)) throw new AppError(404, 'Tradesperson not found', 'not_found');
    const lang = typeof req.query.lang === 'string' ? req.query.lang : undefined;

    const tradesperson = await Tradesperson.findOne({
      _id: req.params.id,
      'registeredBy.partnerId': req.partner!.id,
    })
      .populate('primaryTrade')
      .populate('skillIds')
      .populate('workExperiences.companyId')
      .populate('workExperiences.skillId');

    if (!tradesperson) throw new AppError(404, 'Tradesperson not found', 'not_found');
    res.json(formatTradesperson(tradesperson, lang));
  }),
);

tradespersonRouter.patch(
  '/:id/availability',
  asyncHandler(async (req, res) => {
    if (!isObjectId(req.params.id)) throw new AppError(404, 'Tradesperson not found', 'not_found');
    const { isReadyToWork } = req.body ?? {};
    if (typeof isReadyToWork !== 'boolean') {
      throw new AppError(400, 'isReadyToWork must be a boolean', 'validation_error', {
        isReadyToWork: 'missing_field',
      });
    }

    const tradesperson = await Tradesperson.findOne({
      _id: req.params.id,
      'registeredBy.partnerId': req.partner!.id,
    });
    if (!tradesperson) throw new AppError(404, 'Tradesperson not found', 'not_found');

    if (tradesperson.isReadyToWork === isReadyToWork) {
      res.json(stripIdentityHash(tradesperson));
      return;
    }

    const previousStatus = tradesperson.isReadyToWork;
    tradesperson.isReadyToWork = isReadyToWork;
    tradesperson.statusUpdatedAt = new Date();
    await tradesperson.save();

    await TradespersonAvailabilityLog.create({
      tradespersonId: tradesperson._id,
      previousStatus,
      newStatus: isReadyToWork,
      updatedBy: { partnerId: req.partner!.id, role: req.partner!.role },
    });

    res.json(stripIdentityHash(tradesperson));
  }),
);
