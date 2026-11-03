import { Schema, model } from 'mongoose';

// One collection for every partner type. `role` says which type it is and
// `profile` holds that type's own fields (replaces the 4 *_profiles tables):
//   csc:       { vleId, kioskName, kioskAddress, certificateDocUrl, location }
//   cmc:       { mobilizerId, agencyOrPartnerName, supervisorName, supervisorPhone, assignedPanchayat }
//   anganwadi: { awcCode, centerName, sectorCircle, cdpoOfficeName }
//   gov_ngo:   { organizationName, registrationOrDarpanId, designation, jurisdictionLevel }
// Per-role validation belongs in the service layer, once signup is built.
const partnerSchema = new Schema(
  {
    role: { type: String, required: true, enum: ['csc', 'cmc', 'anganwadi', 'gov_ngo'] },
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, select: false },
    status: { type: String, enum: ['pending', 'approved'], default: 'pending' }, // matches frontend AccountStatus
    state: String,
    district: String,
    subDistrict: String,
    pincode: String,
    profile: Schema.Types.Mixed,
  },
  { timestamps: true },
);

partnerSchema.index({ role: 1, state: 1, district: 1 });

export const SourcingPartner = model('SourcingPartner', partnerSchema);
