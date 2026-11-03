import { Schema, model } from 'mongoose';

const address = new Schema(
  { line: String, villageOrTown: String, district: String, state: String, pincode: String },
  { _id: false },
);

const workExperience = new Schema({
  primaryTrade: { type: String, required: true },
  subSkills: [String],
  yearsOfExperience: Number,
  dailyWageExpected: Number,
});

const laborerSchema = new Schema(
  {
    idType: { type: String, required: true },
    identityHash: { type: String, required: true },
    maskedIdentity: { type: String, required: true },
    panNumber: String,

    fullName: { type: String, required: true },
    dateOfBirth: Date,
    gender: String,
    phoneNumber: String,

    permanentAddress: address,
    presentAddress: address, // omitted when presentSameAsPermanent
    presentSameAsPermanent: { type: Boolean, default: false },

    isReadyToWork: { type: Boolean, default: false },
    statusUpdatedAt: Date,

    registeredBy: {
      partnerId: { type: Schema.Types.ObjectId, ref: 'SourcingPartner', required: true },
      role: { type: String, required: true },
    },
    // GeoJSON [lng, lat]
    registrationLocation: { type: { type: String, enum: ['Point'] }, coordinates: [Number] },

    documents: {
      primaryIdFrontUrl: String,
      primaryIdBackUrl: String,
      panCardUrl: String,
      photoUrl: String,
    },
    workExperiences: [workExperience],
  },
  { timestamps: true },
);

laborerSchema.index({ idType: 1, identityHash: 1 }, { unique: true });
laborerSchema.index({ 'permanentAddress.state': 1, 'permanentAddress.district': 1 });
laborerSchema.index({ isReadyToWork: 1, 'workExperiences.primaryTrade': 1 });
laborerSchema.index({ 'registeredBy.partnerId': 1 });

export const Laborer = model('Laborer', laborerSchema);
