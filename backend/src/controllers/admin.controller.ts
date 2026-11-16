import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import { Admin, Company, SourcingPartner, Worker, Job, Skill } from '../models';
import { AppError } from '../middleware/asyncHandler';
import { toAuthAdmin } from '../middleware/adminAuth';
import { env } from '../config/env';
import { buildSearchTerms, normalize, skillDisplayName } from '../services/catalog';
import { catalogView } from '../models/i18n';
import { parseLang } from '../config/languages';

const ROLES = ['csc', 'cmc', 'anganwadi', 'gov_ngo'] as const;
const STATUSES = ['pending', 'accepted', 'rejected'] as const;

function isObjectId(v: unknown): v is string {
  return typeof v === 'string' && Types.ObjectId.isValid(v);
}

function pageLimit(query: Record<string, unknown>) {
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(50, Math.max(1, Number(query.limit) || 20));
  return { page, limit, skip: (page - 1) * limit };
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function plain(doc: { toObject?: (o?: object) => Record<string, unknown> } & Record<string, unknown>) {
  const o = typeof doc.toObject === 'function' ? doc.toObject({ virtuals: true }) : { ...doc };
  delete o.passwordHash;
  delete o.__v;
  o.id = o.id ?? String(o._id);
  o.isBlocked = Boolean(o.isBlocked);
  return o;
}

function stripIdentityHash(doc: InstanceType<typeof Worker>) {
  const o = doc.toObject({ virtuals: true }) as Record<string, any>;
  delete o.identityHash;
  delete o.__v;
  o.id = o.id ?? String(o._id);
  return o;
}

function refName(doc: any, lang?: string): { id: string; name: string } | null {
  if (!doc || !doc._id) return null;
  const id = doc.id ?? String(doc._id);
  if (typeof doc.name === 'string' && !doc.names) return { id, name: doc.name };
  if (doc.names) return { id, name: String(catalogView(doc, parseLang(lang)).name ?? skillDisplayName(doc, lang)) };
  return { id, name: skillDisplayName(doc, lang) };
}

function formatWorker(doc: InstanceType<typeof Worker>, lang?: string) {
  const o = stripIdentityHash(doc);
  if (o.jobId && o.jobId._id) {
    o.jobId = refName(o.jobId, lang);
    o.primaryTrade = o.jobId;
  }
  if (Array.isArray(o.skillIds)) {
    o.skillIds = o.skillIds.map((s: any) => (s && s._id ? refName(s, lang) : null)).filter(Boolean);
  }
  if (Array.isArray(o.workExperiences)) {
    o.workExperiences = o.workExperiences.map((ex: any) => ({
      ...ex,
      companyId: ex.companyId?._id ? refName(ex.companyId, lang) : ex.companyId,
      skillId: ex.skillId?._id ? refName(ex.skillId, lang) : ex.skillId,
    }));
  }
  if (o.registeredBy?.partnerId && typeof o.registeredBy.partnerId === 'object') {
    const partner = o.registeredBy.partnerId;
    o.registeredBy = {
      partnerId: partner.id ?? String(partner._id),
      role: o.registeredBy.role,
      fullName: partner.fullName,
      phoneNumber: partner.phoneNumber,
    };
  }
  return o;
}

async function loadWorker(id: string, lang?: string) {
  const worker = await Worker.findById(id)
    .populate('jobId')
    .populate('skillIds')
    .populate('workExperiences.companyId')
    .populate('workExperiences.skillId')
    .populate('registeredBy.partnerId', 'fullName phoneNumber role');
  if (!worker) throw new AppError(404, 'Worker not found', 'not_found');
  return formatWorker(worker, lang);
}

function formatAdminJob(job: InstanceType<typeof Job>, lang?: string) {
  const o = plain(job as any);
  o.name = skillDisplayName(job, lang);
  return o;
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body ?? {};
  if (typeof email !== 'string' || !email.trim()) {
    throw new AppError(400, 'email is required', 'validation_error', { email: 'missing_field' });
  }
  if (typeof password !== 'string' || !password) {
    throw new AppError(400, 'password is required', 'validation_error', { password: 'missing_field' });
  }
  const admin = await Admin.findOne({ email: email.trim().toLowerCase() }).select('+passwordHash');
  if (!admin?.passwordHash || !(await bcrypt.compare(password, admin.passwordHash))) {
    throw new AppError(401, 'Invalid email or password', 'invalid_credentials');
  }
  const auth = toAuthAdmin(admin);
  const token = jwt.sign({ sub: auth.id, typ: 'admin' }, env.jwtSecret, { expiresIn: '7d' });
  res.json({ token, admin: auth });
}

export async function me(req: Request, res: Response) {
  res.json({ admin: req.admin });
}

export async function listPartners(req: Request, res: Response) {
  const filter: Record<string, unknown> = {};
  if (typeof req.query.role === 'string' && ROLES.includes(req.query.role as (typeof ROLES)[number])) {
    filter.role = req.query.role;
  }
  if (typeof req.query.status === 'string' && STATUSES.includes(req.query.status as (typeof STATUSES)[number])) {
    filter.status = req.query.status;
  }
  if (req.query.isBlocked === 'true') filter.isBlocked = true;
  if (req.query.isBlocked === 'false') filter.isBlocked = { $ne: true };
  if (typeof req.query.state === 'string' && req.query.state) filter.state = req.query.state;
  if (typeof req.query.district === 'string' && req.query.district) filter.district = req.query.district;
  if (typeof req.query.q === 'string' && req.query.q.trim()) {
    const q = escapeRegex(req.query.q.trim());
    filter.$or = [
      { fullName: { $regex: q, $options: 'i' } },
      { phoneNumber: { $regex: q, $options: 'i' } },
      { email: { $regex: q, $options: 'i' } },
    ];
  }
  const { page, limit, skip } = pageLimit(req.query as Record<string, unknown>);
  const [rows, total] = await Promise.all([
    SourcingPartner.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    SourcingPartner.countDocuments(filter),
  ]);
  res.json({ items: rows.map((r) => plain(r as any)), page, limit, total });
}

export async function updatePartner(req: Request, res: Response) {
  if (!isObjectId(req.params.id)) throw new AppError(404, 'Partner not found', 'not_found');
  const partner = await SourcingPartner.findById(req.params.id);
  if (!partner) throw new AppError(404, 'Partner not found', 'not_found');
  const body = req.body ?? {};
  if (typeof body.fullName === 'string' && body.fullName.trim()) partner.fullName = body.fullName.trim();
  if (body.email !== undefined) {
    if (body.email == null || body.email === '') partner.email = undefined;
    else if (typeof body.email === 'string') {
      const email = body.email.trim().toLowerCase();
      if (!email.includes('@') || !email.includes('.')) {
        throw new AppError(400, 'email is invalid', 'validation_error', { email: 'invalid_email' });
      }
      partner.email = email;
    }
  }
  if (body.status !== undefined) {
    if (!STATUSES.includes(body.status)) {
      throw new AppError(400, 'Invalid status', 'validation_error', { status: 'invalid_status' });
    }
    partner.status = body.status;
    partner.reviewedBy = req.admin!.id as any;
    partner.reviewedAt = new Date();
    if (body.status === 'rejected' && typeof body.rejectionReason === 'string') {
      partner.rejectionReason = body.rejectionReason.trim() || undefined;
    }
    if (body.status === 'accepted') partner.rejectionReason = undefined;
  }
  if (body.permanentAddress !== undefined) {
    partner.permanentAddress = body.permanentAddress;
    partner.state = body.permanentAddress?.state ?? partner.state;
    partner.district = body.permanentAddress?.district ?? partner.district;
    partner.pincode = body.permanentAddress?.pincode ?? partner.pincode;
  }
  if (body.presentAddress !== undefined) partner.presentAddress = body.presentAddress;
  if (body.presentSameAsPermanent !== undefined) {
    partner.presentSameAsPermanent = Boolean(body.presentSameAsPermanent);
  }
  if (body.profile && typeof body.profile === 'object') {
    partner.profile = { ...(partner.profile as object), ...body.profile };
  }
  try {
    await partner.save();
  } catch (err: any) {
    if (err?.code === 11000) throw new AppError(409, 'Duplicate email or phone', 'duplicate');
    throw err;
  }
  res.json(plain(partner as any));
}

export async function blockPartner(req: Request, res: Response) {
  if (!isObjectId(req.params.id)) throw new AppError(404, 'Partner not found', 'not_found');
  if (typeof req.body?.blocked !== 'boolean') {
    throw new AppError(400, 'blocked must be a boolean', 'validation_error', { blocked: 'missing_field' });
  }
  const partner = await SourcingPartner.findByIdAndUpdate(
    req.params.id,
    { $set: { isBlocked: req.body.blocked } },
    { new: true },
  );
  if (!partner) throw new AppError(404, 'Partner not found', 'not_found');
  res.json(plain(partner as any));
}

export async function listCompanies(req: Request, res: Response) {
  const filter: Record<string, unknown> = {};
  if (typeof req.query.status === 'string' && STATUSES.includes(req.query.status as (typeof STATUSES)[number])) {
    filter.status = req.query.status;
  }
  if (req.query.isBlocked === 'true') filter.isBlocked = true;
  if (req.query.isBlocked === 'false') filter.isBlocked = { $ne: true };
  if (typeof req.query.q === 'string' && req.query.q.trim()) {
    filter.name = { $regex: escapeRegex(req.query.q.trim()), $options: 'i' };
  }
  const { page, limit, skip } = pageLimit(req.query as Record<string, unknown>);
  const [rows, total] = await Promise.all([
    Company.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Company.countDocuments(filter),
  ]);
  res.json({ items: rows.map((r) => plain(r as any)), page, limit, total });
}

export async function createCompany(req: Request, res: Response) {
  const { name, status } = req.body ?? {};
  if (typeof name !== 'string' || !name.trim()) {
    throw new AppError(400, 'name is required', 'validation_error', { name: 'missing_field' });
  }
  const nextStatus: (typeof STATUSES)[number] =
    typeof status === 'string' && STATUSES.includes(status as (typeof STATUSES)[number])
      ? (status as (typeof STATUSES)[number])
      : 'accepted';
  try {
    const company = await Company.create({
      name: name.trim(),
      nameNormalized: normalize(name),
      status: nextStatus,
      isBlocked: false,
      reviewedBy: req.admin!.id,
      reviewedAt: new Date(),
    });
    res.status(201).json(plain(company as any));
  } catch (err: any) {
    if (err?.code === 11000) throw new AppError(409, 'Company already exists', 'duplicate_company');
    throw err;
  }
}

export async function updateCompany(req: Request, res: Response) {
  if (!isObjectId(req.params.id)) throw new AppError(404, 'Company not found', 'not_found');
  const company = await Company.findById(req.params.id);
  if (!company) throw new AppError(404, 'Company not found', 'not_found');
  const body = req.body ?? {};
  if (typeof body.name === 'string' && body.name.trim()) {
    company.name = body.name.trim();
    company.nameNormalized = normalize(body.name);
  }
  if (body.status !== undefined) {
    if (!STATUSES.includes(body.status)) {
      throw new AppError(400, 'Invalid status', 'validation_error', { status: 'invalid_status' });
    }
    company.status = body.status;
    company.reviewedBy = req.admin!.id as any;
    company.reviewedAt = new Date();
  }
  try {
    await company.save();
  } catch (err: any) {
    if (err?.code === 11000) throw new AppError(409, 'Company name already exists', 'duplicate_company');
    throw err;
  }
  res.json(plain(company as any));
}

export async function blockCompany(req: Request, res: Response) {
  if (!isObjectId(req.params.id)) throw new AppError(404, 'Company not found', 'not_found');
  if (typeof req.body?.blocked !== 'boolean') {
    throw new AppError(400, 'blocked must be a boolean', 'validation_error', { blocked: 'missing_field' });
  }
  const company = await Company.findByIdAndUpdate(
    req.params.id,
    { $set: { isBlocked: req.body.blocked } },
    { new: true },
  );
  if (!company) throw new AppError(404, 'Company not found', 'not_found');
  res.json(plain(company as any));
}

export async function listWorkers(req: Request, res: Response) {
  const filter: Record<string, unknown> = {};
  if (typeof req.query.partnerId === 'string' && req.query.partnerId) {
    if (!isObjectId(req.query.partnerId)) {
      throw new AppError(400, 'Invalid partnerId', 'validation_error', { partnerId: 'invalid_id' });
    }
    filter['registeredBy.partnerId'] = req.query.partnerId;
  }
  if (typeof req.query.state === 'string' && req.query.state) filter['permanentAddress.state'] = req.query.state;
  if (typeof req.query.district === 'string' && req.query.district) {
    filter['permanentAddress.district'] = req.query.district;
  }
  if (req.query.isReadyToWork === 'true') filter.isReadyToWork = true;
  if (req.query.isReadyToWork === 'false') filter.isReadyToWork = false;
  if (req.query.hasDisability === 'true') filter.hasDisability = true;
  if (req.query.hasDisability === 'false') filter.hasDisability = false;
  if (typeof req.query.q === 'string' && req.query.q.trim()) {
    filter.fullName = { $regex: escapeRegex(req.query.q.trim()), $options: 'i' };
  }
  if (typeof req.query.skillId === 'string' && req.query.skillId) {
    if (!isObjectId(req.query.skillId)) {
      throw new AppError(400, 'Invalid skillId', 'validation_error', { skillId: 'invalid_id' });
    }
    filter.skillIds = req.query.skillId;
  }
  if (typeof req.query.jobId === 'string' && req.query.jobId) {
    if (!isObjectId(req.query.jobId)) {
      throw new AppError(400, 'Invalid jobId', 'validation_error', { jobId: 'invalid_id' });
    }
    filter.jobId = req.query.jobId;
  }
  const { page, limit, skip } = pageLimit(req.query as Record<string, unknown>);
  const lang = typeof req.query.lang === 'string' ? req.query.lang : undefined;
  const [rows, total] = await Promise.all([
    Worker.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('jobId')
      .populate('skillIds')
      .populate('workExperiences.companyId')
      .populate('workExperiences.skillId')
      .populate('registeredBy.partnerId', 'fullName phoneNumber role'),
    Worker.countDocuments(filter),
  ]);
  res.json({ items: rows.map((r) => formatWorker(r, lang)), page, limit, total });
}

export async function updateWorker(req: Request, res: Response) {
  if (!isObjectId(req.params.id)) throw new AppError(404, 'Worker not found', 'not_found');
  const worker = await Worker.findById(req.params.id);
  if (!worker) throw new AppError(404, 'Worker not found', 'not_found');
  const body = req.body ?? {};
  if (typeof body.fullName === 'string' && body.fullName.trim()) worker.fullName = body.fullName.trim();
  if (body.dateOfBirth !== undefined) worker.dateOfBirth = body.dateOfBirth ? new Date(body.dateOfBirth) : undefined;
  if (body.gender !== undefined) worker.gender = body.gender;
  if (body.phoneNumber !== undefined) worker.phoneNumber = body.phoneNumber;
  if (body.hasDisability !== undefined) {
    worker.hasDisability = Boolean(body.hasDisability);
    if (!worker.hasDisability) worker.disabilityDetails = undefined;
  }
  if (body.disabilityDetails !== undefined) {
    worker.disabilityDetails =
      typeof body.disabilityDetails === 'string' && body.disabilityDetails.trim()
        ? body.disabilityDetails.trim()
        : undefined;
  }
  if (body.permanentAddress !== undefined) worker.permanentAddress = body.permanentAddress;
  if (body.presentSameAsPermanent !== undefined) worker.presentSameAsPermanent = Boolean(body.presentSameAsPermanent);
  if (body.presentAddress !== undefined) worker.presentAddress = body.presentAddress;
  if (body.dailyWageExpected != null) {
    if (typeof body.dailyWageExpected !== 'number' || body.dailyWageExpected < 0) {
      throw new AppError(400, 'dailyWageExpected must be a number >= 0', 'validation_error', {
        dailyWageExpected: 'invalid_number',
      });
    }
    worker.dailyWageExpected = body.dailyWageExpected;
  }
  if (body.isReadyToWork !== undefined && worker.isReadyToWork !== Boolean(body.isReadyToWork)) {
    worker.isReadyToWork = Boolean(body.isReadyToWork);
    worker.statusUpdatedAt = new Date();
  }
  if (body.jobId !== undefined) {
    if (body.jobId == null || body.jobId === '') {
      worker.jobId = undefined as any;
      worker.skillIds = [] as any;
    } else {
      if (!isObjectId(String(body.jobId))) {
        throw new AppError(400, 'Invalid jobId', 'validation_error', { jobId: 'invalid_id' });
      }
      const job = await Job.findById(body.jobId);
      if (!job || job.status === 'rejected') {
        throw new AppError(400, 'Invalid jobId', 'validation_error', { jobId: 'invalid_id' });
      }
      worker.jobId = job._id as any;
      worker.skillIds = (Array.isArray(job.skills) ? job.skills : []) as any;
    }
  }
  await worker.save();
  const lang = typeof req.query.lang === 'string' ? req.query.lang : undefined;
  res.json(await loadWorker(req.params.id, lang));
}

export async function listJobs(req: Request, res: Response) {
  const lang = typeof req.query.lang === 'string' ? req.query.lang : undefined;
  const q = typeof req.query.q === 'string' ? req.query.q.trim() : '';
  const manage =
    req.query.page != null ||
    req.query.limit != null ||
    (typeof req.query.status === 'string' && req.query.status.length > 0);

  if (!manage) {
    const filter: Record<string, unknown> = { status: 'accepted' };
    if (q) filter.searchTerms = { $regex: `^${escapeRegex(normalize(q))}` };
    const rows = await Job.find(filter).sort({ 'names.en': 1 }).limit(50);
    res.json({ items: rows.map((j) => ({ id: j.id, name: skillDisplayName(j, lang) })) });
    return;
  }

  const filter: Record<string, unknown> = {};
  if (typeof req.query.status === 'string' && STATUSES.includes(req.query.status as (typeof STATUSES)[number])) {
    filter.status = req.query.status;
  }
  if (q) {
    filter.searchTerms = { $regex: escapeRegex(normalize(q)), $options: 'i' };
  }
  const { page, limit, skip } = pageLimit(req.query as Record<string, unknown>);
  const [rows, total] = await Promise.all([
    Job.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Job.countDocuments(filter),
  ]);
  res.json({ items: rows.map((j) => formatAdminJob(j, lang)), page, limit, total });
}

export async function createJob(req: Request, res: Response) {
  const { name, status, lang } = req.body ?? {};
  if (typeof name !== 'string' || !name.trim()) {
    throw new AppError(400, 'name is required', 'validation_error', { name: 'missing_field' });
  }
  const trimmed = name.trim();
  const term = normalize(trimmed);
  const existing = await Job.findOne({ searchTerms: term });
  if (existing) {
    throw new AppError(409, 'Job already exists', 'duplicate_job', {
      id: existing.id,
      name: skillDisplayName(existing),
      status: existing.status,
    });
  }
  const nextStatus: (typeof STATUSES)[number] =
    typeof status === 'string' && STATUSES.includes(status as (typeof STATUSES)[number])
      ? (status as (typeof STATUSES)[number])
      : 'accepted';
  const jobLang = typeof lang === 'string' && lang.trim() ? lang.trim() : 'en';
  const job = await Job.create({
    names: { [jobLang]: trimmed },
    aliases: [],
    searchTerms: [term],
    skills: [],
    status: nextStatus,
  });
  res.status(201).json(formatAdminJob(job));
}

export async function updateJob(req: Request, res: Response) {
  if (!isObjectId(req.params.id)) throw new AppError(404, 'Job not found', 'not_found');
  const job = await Job.findById(req.params.id);
  if (!job) throw new AppError(404, 'Job not found', 'not_found');
  const body = req.body ?? {};
  const lang = typeof body.lang === 'string' && body.lang.trim() ? body.lang.trim() : 'en';

  if (typeof body.name === 'string' && body.name.trim()) {
    const trimmed = body.name.trim();
    const term = normalize(trimmed);
    const clash = await Job.findOne({ searchTerms: term, _id: { $ne: job._id } });
    if (clash) {
      throw new AppError(409, 'Job name already exists', 'duplicate_job', {
        id: clash.id,
        name: skillDisplayName(clash),
      });
    }
    const names =
      job.names instanceof Map
        ? Object.fromEntries(job.names.entries())
        : { ...((job.names as Record<string, string>) || {}) };
    names[lang] = trimmed;
    if (!names.en) names.en = trimmed;
    job.names = names as any;
    job.searchTerms = buildSearchTerms(names, job.aliases || []);
  }

  if (body.status !== undefined) {
    if (!STATUSES.includes(body.status)) {
      throw new AppError(400, 'Invalid status', 'validation_error', { status: 'invalid_status' });
    }
    job.status = body.status;
  }

  await job.save();
  const respLang = typeof req.query.lang === 'string' ? req.query.lang : undefined;
  res.json(formatAdminJob(job, respLang));
}

export async function listSkills(req: Request, res: Response) {
  const lang = typeof req.query.lang === 'string' ? req.query.lang : undefined;
  const q = typeof req.query.q === 'string' ? req.query.q.trim() : '';
  const filter: Record<string, unknown> = { status: 'accepted' };
  if (q) filter.searchTerms = { $regex: `^${escapeRegex(normalize(q))}` };
  const rows = await Skill.find(filter).limit(50);
  res.json({ items: rows.map((s) => ({ id: s.id, name: skillDisplayName(s, lang) })) });
}
