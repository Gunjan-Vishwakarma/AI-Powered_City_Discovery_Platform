import { Schema, model, Document } from 'mongoose';
import { IBookmark } from '../types';

export interface BookmarkDocument extends Omit<IBookmark, 'id'>, Document {}

const BookmarkSchema = new Schema<BookmarkDocument>(
  {
    userId: { type: String, default: 'guest-user', index: true },
    itemId: { type: String, required: true },
    itemType: {
      type: String,
      enum: ['city', 'food', 'culture', 'language', 'place', 'festival', 'news'],
      required: true,
      index: true,
    },
    citySlug: { type: String, required: true, index: true },
    title: { type: String, required: true },
    subtitle: { type: String },
    emoji: { type: String, default: '🔖' },
    savedAt: { type: String, default: () => new Date().toISOString() },
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

BookmarkSchema.index({ userId: 1, itemId: 1 }, { unique: true });

export const Bookmark = model<BookmarkDocument>('Bookmark', BookmarkSchema);
