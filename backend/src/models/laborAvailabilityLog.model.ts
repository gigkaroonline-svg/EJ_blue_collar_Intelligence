import { Schema, model } from 'mongoose';

// Append-only history, kept out of `laborers` because it grows without limit.
const logSchema = new Schema(
  {
    laborerId: { type: Schema.Types.ObjectId, ref: 'Laborer', required: true },
    previousStatus: Boolean,
    newStatus: { type: Boolean, required: true },
    updatedBy: { partnerId: Schema.Types.ObjectId, role: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

logSchema.index({ laborerId: 1, createdAt: -1 });

export const LaborAvailabilityLog = model('LaborAvailabilityLog', logSchema);
