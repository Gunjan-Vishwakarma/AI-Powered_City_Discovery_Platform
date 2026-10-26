import { Schema, model, Document } from 'mongoose';
import { ICultureItem } from '../types';

export interface CultureItemDocument extends Omit<ICultureItem, 'id'>, Document {}

const CultureItemSchema = new Schema<CultureItemDocument>(
  {
    citySlug: { type: String, required: true, index: true },
    name: { type: String, required: true, index: true },
    type: {
      type: String,
      enum: ['art', 'dance', 'music', 'theatre', 'craft', 'textile', 'tradition', 'architecture'],
      required: true,
      index: true,
    },
    era: { type: String, required: true },
    description: { type: String, required: true },
    aiSummary: { type: String, required: true },
    significance: { type: String, required: true },
    whereToExperience: [{ type: String }],
    isUnescoHeritage: { type: Boolean, default: false, index: true },
    popularityScore: { type: Number, default: 85, index: -1 },
    emoji: { type: String, required: true },
    tags: [{ type: String, index: true }],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret: any) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

CultureItemSchema.index({ citySlug: 1, popularityScore: -1 });

export const CultureItem = model<CultureItemDocument>('CultureItem', CultureItemSchema);
