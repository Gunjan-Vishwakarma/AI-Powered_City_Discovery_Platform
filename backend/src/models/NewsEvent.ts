import { Schema, model, Document } from 'mongoose';
import { INewsItem } from '../types';

export interface NewsEventDocument extends Omit<INewsItem, 'id'>, Document {
  expiresAt?: Date;
}

const NewsEventSchema = new Schema<NewsEventDocument>(
  {
    citySlug: { type: String, required: true, index: true },
    title: { type: String, required: true, index: true },
    summary: { type: String, required: true },
    aiSummary: { type: String, required: true },
    sourceName: { type: String, required: true },
    publishedAt: { type: String, required: true },
    category: {
      type: String,
      enum: ['civic', 'culture', 'sports', 'politics', 'business', 'development', 'community'],
      required: true,
      index: true,
    },
    tags: [{ type: String, index: true }],
    popularityScore: { type: Number, default: 80, index: -1 },
    emoji: { type: String, required: true },
    expiresAt: { type: Date, default: () => new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) },
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

NewsEventSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL Auto cleanup
NewsEventSchema.index({ citySlug: 1, popularityScore: -1 });

export const NewsEvent = model<NewsEventDocument>('NewsEvent', NewsEventSchema);
