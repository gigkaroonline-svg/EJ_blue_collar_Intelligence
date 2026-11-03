// Sample data for local/dev. WARNING: wipes the 4 collections first.
import { Types } from 'mongoose';
import { connectToMongoDB, disconnectFromMongoDB } from '../config/db';
import { Laborer, LaborAvailabilityLog, SourcingPartner, PartnerOtp } from '../models';

const id = () => new Types.ObjectId();
const cscId = id(), cmcId = id(), awcId = id(), ngoId = id();
const hash = (c: string) => c.repeat(64);

const partners = [
  {
    _id: cscId, role: 'csc', fullName: 'Ramesh Patel', phoneNumber: '9876500001',
    email: 'ramesh.csc@example.com', status: 'approved', state: 'Gujarat', district: 'Ahmedabad',
    subDistrict: 'Daskroi', pincode: '382430',
    profile: {
      vleId: 'VLE-GJ-1001', kioskName: 'Patel Digital Seva', kioskAddress: 'Main Bazaar, Daskroi',
      certificateDocUrl: 'https://example.com/docs/csc1001.pdf',
      location: { type: 'Point', coordinates: [72.6869, 22.9676] },
    },
  },
  {
    _id: cmcId, role: 'cmc', fullName: 'Sunita Devi', phoneNumber: '9876500002',
    email: 'sunita.cmc@example.com', status: 'approved', state: 'Bihar', district: 'Patna',
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
    email: 'meera.ngo@example.com', status: 'approved', state: 'Karnataka', district: 'Bengaluru Urban',
    pincode: '560001',
    profile: {
      organizationName: 'Skill Bharat Foundation', registrationOrDarpanId: 'KA/2020/0012345',
      designation: 'Program Director', jurisdictionLevel: 'state',
    },
  },
];

const addr = (district: string, state: string, pincode: string) => ({
  line: '12, Gandhi Road', villageOrTown: district, district, state, pincode,
});

const laborers = [
  {
    _id: id(), idType: 'aadhaar', identityHash: hash('a'), maskedIdentity: 'XXXX-XXXX-1234',
    fullName: 'Mohan Singh', dateOfBirth: new Date('1990-04-12'), gender: 'male', phoneNumber: '9000000001',
    permanentAddress: addr('Ahmedabad', 'Gujarat', '382430'), presentSameAsPermanent: true,
    isReadyToWork: true, statusUpdatedAt: new Date(),
    registeredBy: { partnerId: cscId, role: 'csc' },
    registrationLocation: { type: 'Point', coordinates: [72.6869, 22.9676] },
    documents: { primaryIdFrontUrl: 'https://example.com/m1/front.jpg', primaryIdBackUrl: 'https://example.com/m1/back.jpg', photoUrl: 'https://example.com/m1/photo.jpg' },
    workExperiences: [
      { primaryTrade: 'Mason', subSkills: ['tiling', 'plastering'], yearsOfExperience: 8, dailyWageExpected: 700 },
      { primaryTrade: 'Painter', subSkills: ['wall putty'], yearsOfExperience: 2, dailyWageExpected: 600 },
    ],
  },
  {
    _id: id(), idType: 'aadhaar', identityHash: hash('b'), maskedIdentity: 'XXXX-XXXX-5678',
    panNumber: 'ABCDE1234F', fullName: 'Geeta Kumari', dateOfBirth: new Date('1995-09-30'), gender: 'female',
    phoneNumber: '9000000002',
    permanentAddress: addr('Patna', 'Bihar', '801503'),
    presentAddress: addr('Pune', 'Maharashtra', '411001'), presentSameAsPermanent: false,
    isReadyToWork: false, statusUpdatedAt: new Date(),
    registeredBy: { partnerId: cmcId, role: 'cmc' },
    documents: { primaryIdFrontUrl: 'https://example.com/g2/front.jpg', panCardUrl: 'https://example.com/g2/pan.jpg' },
    workExperiences: [{ primaryTrade: 'Tailor', subSkills: ['stitching', 'embroidery'], yearsOfExperience: 5, dailyWageExpected: 550 }],
  },
  {
    _id: id(), idType: 'voter_id', identityHash: hash('c'), maskedIdentity: 'XXXXXX7890',
    fullName: 'Suresh Yadav', dateOfBirth: new Date('1987-01-05'), gender: 'male', phoneNumber: '9000000003',
    permanentAddress: addr('Pune', 'Maharashtra', '412205'), presentSameAsPermanent: true,
    isReadyToWork: true, statusUpdatedAt: new Date(),
    registeredBy: { partnerId: ngoId, role: 'gov_ngo' },
    workExperiences: [{ primaryTrade: 'Electrician', subSkills: ['wiring', 'panel repair'], yearsOfExperience: 12, dailyWageExpected: 900 }],
  },
];

async function main() {
  await connectToMongoDB();
  await Promise.all([Laborer.deleteMany({}), LaborAvailabilityLog.deleteMany({}), SourcingPartner.deleteMany({}), PartnerOtp.deleteMany({})]);

  await SourcingPartner.insertMany(partners);
  await Laborer.insertMany(laborers);
  await LaborAvailabilityLog.insertMany([
    { laborerId: laborers[0]._id, previousStatus: false, newStatus: true, updatedBy: { partnerId: cscId, role: 'csc' } },
    { laborerId: laborers[1]._id, previousStatus: true, newStatus: false, updatedBy: { partnerId: cmcId, role: 'cmc' } },
    { laborerId: laborers[2]._id, previousStatus: false, newStatus: true, updatedBy: { partnerId: ngoId, role: 'gov_ngo' } },
  ]);
  await PartnerOtp.create({
    phoneNumber: '9876500003', otpHmac: 'dummy-hmac-not-a-real-otp', purpose: 'signup',
    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
  });

  console.log('Seeded: 4 partners, 3 laborers, 3 availability logs, 1 OTP');
}

main()
  .catch((err) => { console.error(err); process.exitCode = 1; })
  .finally(disconnectFromMongoDB);
