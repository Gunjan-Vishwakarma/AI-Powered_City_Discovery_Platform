import { Schema, model, Document } from 'mongoose';
import { ILanguageProfile } from '../types';

export interface LanguageDocument extends Omit<ILanguageProfile, 'id'>, Document {}

const LanguageSchema = new Schema<LanguageDocument>(
  {
    citySlug: { type: String, required: true, index: true },
    name: { type: String, required: true },
    nativeName: { type: String, required: true },
    script: { type: String, required: true },
    isoCode: { type: String, required: true },
    family: { type: String, required: true },
    role: {
      type: String,
      enum: ['official', 'regional', 'widely_spoken', 'minority'],
      required: true,
    },
    nativeSpeakers: { type: String, required: true },
    origin: { type: String, required: true },
    aiSummary: { type: String, required: true },
    uniqueFeatures: [{ type: String }],
    commonPhrases: [
      {
        english: { type: String, required: true },
        local: { type: String, required: true },
        transliteration: { type: String, required: true },
        pronunciation: { type: String, required: true },
      },
    ],
    dialects: [{ type: String }],
    relatedLanguages: [{ type: String }],
    isClassicalLanguage: { type: Boolean, default: false },
    literaryHistory: { type: String, required: true },
    emoji: { type: String, required: true },
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

LanguageSchema.index({ citySlug: 1 });

export const Language = model<LanguageDocument>('Language', LanguageSchema);
