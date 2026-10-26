import { Schema, model, Document } from 'mongoose';
import { IFestivalItem } from '../types';

export interface FestivalDocument extends Omit<IFestivalItem, 'id'>, Document {}

const FestivalSchema = new Schema<FestivalDocument>(
  {
    citySlug: { type: String, required: true, index: true },
    name: { type: String, required: true, index: true },
    localName: { type: String, required: true },
    type: {
      type: String,
      enum: ['religious', 'cultural', 'harvest', 'music', 'film', 'folk', 'civic'],
      required: true,
      index: true,
    },
    religion: { type: String, default: null },
    month: { type: Number, required: true, index: true },
    duration: { type: String, required: true },
    isNationalHoliday: { type: Boolean, default: false },
    description: { type: String, required: true },
    aiSummary: { type: String, required: true },
    significance: { type: String, required: true },
    howItsCelebrated: [{ type: String }],
    bestPlacesToWitness: [{ type: String }],
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

FestivalSchema.index({ citySlug: 1, month: 1 });
FestivalSchema.index({ citySlug: 1, popularityScore: -1 });

export const Festival = model<FestivalDocument>('Festival', FestivalSchema);
