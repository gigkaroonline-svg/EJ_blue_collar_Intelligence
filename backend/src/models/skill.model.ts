import { Schema, model } from 'mongoose';

const skillSchema = new Schema(
  {
    names: { type: Map, of: String, default: {} },
    aliases: [String],
    searchTerms: {
      type: [String],
      validate: { validator: (v: string[]) => Array.isArray(v) && v.length > 0, message: 'searchTerms must contain at least one entry' },
    },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    suggestedBy: [{ type: Schema.Types.ObjectId, ref: 'SourcingPartner' }],
    reviewedBy: { type: Schema.Types.ObjectId, ref: 'Admin' },
    reviewedAt: Date,
    mergedInto: { type: Schema.Types.ObjectId, ref: 'Skill' },
  },
  { timestamps: true },
);

skillSchema.index({ searchTerms: 1 }, { unique: true });

export const Skill = model('Skill', skillSchema);
