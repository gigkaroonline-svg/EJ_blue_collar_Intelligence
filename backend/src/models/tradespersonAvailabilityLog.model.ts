import { Schema, model } from 'mongoose';

// Append-only history, kept out of `tradespeople` because it grows without limit.
const logSchema = new Schema(
  {
    tradespersonId: { type: Schema.Types.ObjectId, ref: 'Tradesperson', required: true },
    previousStatus: Boolean,
    newStatus: { type: Boolean, required: true },
    updatedBy: { partnerId: Schema.Types.ObjectId, role: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

logSchema.index({ tradespersonId: 1, createdAt: -1 });

export const TradespersonAvailabilityLog = model(
  'TradespersonAvailabilityLog',
  logSchema,
  'tradesperson_availability_logs',
);
