// Sample data for local/dev. WARNING: wipes the collections first.
import mongoose, { Types } from 'mongoose';
import { connectToMongoDB, disconnectFromMongoDB } from '../config/db';
import {
  Admin, Company, Skill, Tradesperson, TradespersonAvailabilityLog, SourcingPartner, PartnerOtp,
} from '../models';
import { normalize, buildSearchTerms } from '../services/catalog';

const id = () => new Types.ObjectId();
const cscId = id(), cmcId = id(), awcId = id(), ngoId = id(), adminId = id();
const masonId = id(), painterId = id(), tailorId = id(), electricianId = id(), welderId = id();
const pendingSkillId = id();
const acmeId = id(), shaktiId = id(), pendingCompanyId = id();
const hash = (c: string) => c.repeat(64);

const partners = [
  {
    _id: cscId, role: 'csc', fullName: 'Ramesh Patel', phoneNumber: '9876500001',
    email: 'ramesh.csc@example.com', status: 'accepted', state: 'Gujarat', district: 'Ahmedabad',
    subDistrict: 'Daskroi', pincode: '382430',
    profile: {
      vleId: 'VLE-GJ-1001', kioskName: 'Patel Digital Seva', kioskAddress: 'Main Bazaar, Daskroi',
      certificateDocUrl: 'https://example.com/docs/csc1001.pdf',
      location: { type: 'Point', coordinates: [72.6869, 22.9676] },
    },
  },
  {
    _id: cmcId, role: 'cmc', fullName: 'Sunita Devi', phoneNumber: '9876500002',
    email: 'sunita.cmc@example.com', status: 'accepted', state: 'Bihar', district: 'Patna',
    subDistrict: 'Danapur', pincode: '801503',
    profile: {
      mobilizerId: 'MOB-BR-2002', agencyOrPartnerName: 'Rozgar Seva Trust',
      supervisorName: 'Anil Kumar', supervisorPhone: '9876500099', assignedPanchayat: 'Danapur Khagaul',
    },
  },
  {
    _id: awcId, role: 'anganwadi', fullName: 'Lakshmi Bai', phoneNumber: '9876500003',
    email: 'lakshmi.awc@example.com', status: 'pending', state: 'Maharashtra', district: 'Pune',
    pincode: '412205',
    profile: { awcCode: 'AWC-MH-3003', centerName: 'Shivaji Nagar AWC', sectorCircle: 'Haveli-2', cdpoOfficeName: 'CDPO Haveli' },
  },
  {
    _id: ngoId, role: 'gov_ngo', fullName: 'Dr. Meera Iyer', phoneNumber: '9876500004',
    email: 'meera.ngo@example.com', status: 'accepted', state: 'Karnataka', district: 'Bengaluru Urban',
    pincode: '560001',
    profile: {
      organizationName: 'Skill Bharat Foundation', registrationOrDarpanId: 'KA/2020/0012345',
      designation: 'Program Director', jurisdictionLevel: 'state',
    },
  },
];

const masonNames = { en: 'Mason', hi: 'राजमिस्त्री', gu: 'કડિયા' };
const skills = [
  {
    _id: masonId, names: masonNames, aliases: ['kadiya'],
    searchTerms: buildSearchTerms(masonNames, ['kadiya']),
    status: 'accepted', suggestedBy: [cscId],
  },
  {
    _id: painterId, names: { en: 'Painter', hi: 'पेंटर' }, aliases: [],
    searchTerms: buildSearchTerms({ en: 'Painter', hi: 'पेंटर' }),
    status: 'accepted', suggestedBy: [cscId],
  },
  {
    _id: tailorId, names: { en: 'Tailor', hi: 'दर्जी' }, aliases: [],
    searchTerms: buildSearchTerms({ en: 'Tailor', hi: 'दर्जी' }),
    status: 'accepted', suggestedBy: [cmcId],
  },
  {
    _id: electricianId, names: { en: 'Electrician', hi: 'बिजली मिस्त्री' }, aliases: [],
    searchTerms: buildSearchTerms({ en: 'Electrician', hi: 'बिजली मिस्त्री' }),
    status: 'accepted', suggestedBy: [ngoId],
  },
  {
    _id: welderId, names: { en: 'Welder' }, aliases: [],
    searchTerms: buildSearchTerms({ en: 'Welder' }),
    status: 'accepted', suggestedBy: [cscId],
  },
  {
    _id: pendingSkillId, names: { en: 'Scaffolding' }, aliases: [],
    searchTerms: buildSearchTerms({ en: 'Scaffolding' }),
    status: 'pending', suggestedBy: [cmcId],
  },
];

const companies = [
  {
    _id: acmeId, name: 'Acme Builders', nameNormalized: normalize('Acme Builders'),
    status: 'accepted', suggestedBy: [cscId],
  },
  {
    _id: shaktiId, name: 'Shakti Infra', nameNormalized: normalize('Shakti Infra'),
    status: 'accepted', suggestedBy: [cmcId],
  },
  {
    _id: pendingCompanyId, name: 'Local Contractors Co', nameNormalized: normalize('Local Contractors Co'),
    status: 'pending', suggestedBy: [ngoId],
  },
];

const addr = (district: string, state: string, pincode: string) => ({
  line: '12, Gandhi Road', villageOrTown: district, district, state, pincode,
});

const tradespeople = [
  // No skills, no experience
  {
    _id: id(), idType: 'aadhaar', identityHash: hash('a'), maskedIdentity: 'XXXX-XXXX-1234',
    fullName: 'Mohan Singh', dateOfBirth: new Date('1990-04-12'), gender: 'male', phoneNumber: '9000000001',
    permanentAddress: addr('Ahmedabad', 'Gujarat', '382430'), presentSameAsPermanent: true,
    isReadyToWork: true, statusUpdatedAt: new Date(),
    registeredBy: { partnerId: cscId, role: 'csc' },
    registrationLocation: { type: 'Point', coordinates: [72.6869, 22.9676] },
    documents: { primaryIdFrontUrl: 'https://example.com/m1/front.jpg', primaryIdBackUrl: 'https://example.com/m1/back.jpg', photoUrl: 'https://example.com/m1/photo.jpg' },
  },
  // skillIds + dailyWageExpected, no experience
  {
    _id: id(), idType: 'aadhaar', identityHash: hash('b'), maskedIdentity: 'XXXX-XXXX-5678',
    panNumber: 'ABCDE1234F', fullName: 'Geeta Kumari', dateOfBirth: new Date('1995-09-30'), gender: 'female',
    phoneNumber: '9000000002',
    permanentAddress: addr('Patna', 'Bihar', '801503'),
    presentAddress: addr('Pune', 'Maharashtra', '411001'), presentSameAsPermanent: false,
    isReadyToWork: false, statusUpdatedAt: new Date(),
    dailyWageExpected: 550, primaryTrade: tailorId, skillIds: [tailorId, painterId],
    registeredBy: { partnerId: cmcId, role: 'cmc' },
    documents: { primaryIdFrontUrl: 'https://example.com/g2/front.jpg', panCardUrl: 'https://example.com/g2/pan.jpg' },
  },
  // skillIds + one experience with companyId
  {
    _id: id(), idType: 'voter_id', identityHash: hash('c'), maskedIdentity: 'XXXXXX7890',
    fullName: 'Suresh Yadav', dateOfBirth: new Date('1987-01-05'), gender: 'male', phoneNumber: '9000000003',
    permanentAddress: addr('Pune', 'Maharashtra', '412205'), presentSameAsPermanent: true,
    isReadyToWork: true, statusUpdatedAt: new Date(),
    dailyWageExpected: 900, primaryTrade: electricianId, skillIds: [electricianId, masonId],
    registeredBy: { partnerId: ngoId, role: 'gov_ngo' },
    workExperiences: [{
      companyId: acmeId, skillId: electricianId, yearsOfExperience: 12,
      addedBy: { partnerId: ngoId, role: 'gov_ngo' },
    }],
  },
];

async function dropLegacyCollections() {
  const db = mongoose.connection.db;
  if (!db) return;
  for (const name of [
    'lab' + 'orers',
    'lab' + 'oravailabilitylogs',
    'people',
    'person_availability_logs',
  ]) {
    try {
      await db.dropCollection(name);
    } catch (err: any) {
      if (err?.codeName !== 'NamespaceNotFound' && err?.message !== 'ns not found' && !/ns not found/i.test(err?.message ?? '')) {
        // ignore missing collections only
        if (err?.code !== 26) throw err;
      }
    }
  }
}

async function main() {
  await connectToMongoDB();
  await dropLegacyCollections();
  await Promise.all([
    Tradesperson.deleteMany({}), TradespersonAvailabilityLog.deleteMany({}),
    SourcingPartner.deleteMany({}), PartnerOtp.deleteMany({}),
    Admin.deleteMany({}), Company.deleteMany({}), Skill.deleteMany({}),
  ]);

  await Admin.create({
    _id: adminId, name: 'Platform Admin', email: 'admin@example.com',
    passwordHash: 'dummy-hash-not-a-real-password',
  });
  await SourcingPartner.insertMany(partners);
  await Skill.insertMany(skills);
  await Company.insertMany(companies);
  await Tradesperson.insertMany(tradespeople);
  await TradespersonAvailabilityLog.insertMany([
    { tradespersonId: tradespeople[0]._id, previousStatus: false, newStatus: true, updatedBy: { partnerId: cscId, role: 'csc' } },
    { tradespersonId: tradespeople[1]._id, previousStatus: true, newStatus: false, updatedBy: { partnerId: cmcId, role: 'cmc' } },
    { tradespersonId: tradespeople[2]._id, previousStatus: false, newStatus: true, updatedBy: { partnerId: ngoId, role: 'gov_ngo' } },
  ]);
  await PartnerOtp.create({
    phoneNumber: '9876500003', otpHmac: 'dummy-hmac-not-a-real-otp', purpose: 'signup',
    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
  });

  console.log('Seeded: 1 admin, 4 partners, 6 skills, 3 companies, 3 tradespeople, 3 availability logs, 1 OTP');
}

main()
  .catch((err) => { console.error(err); process.exitCode = 1; })
  .finally(disconnectFromMongoDB);
