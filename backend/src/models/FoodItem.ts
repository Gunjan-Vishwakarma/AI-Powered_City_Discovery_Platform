import { Schema, model, Document } from 'mongoose';
import { IFoodItem } from '../types';

export interface FoodItemDocument extends Omit<IFoodItem, 'id'>, Document {}

const FoodItemSchema = new Schema<FoodItemDocument>(
  {
    citySlug: { type: String, required: true, index: true },
    name: { type: String, required: true, index: true },
    type: {
      type: String,
      enum: ['dish', 'street_food', 'sweet', 'beverage', 'snack', 'full_meal'],
      required: true,
      index: true,
    },
    mealType: [{ type: String }],
    isVegetarian: { type: Boolean, default: false, index: true },
    isVegan: { type: Boolean, default: false },
    region: { type: String, required: true },
    description: { type: String, required: true },
    aiSummary: { type: String, required: true },
    ingredients: [{ type: String }],
    whereToFind: [{ type: String }],
    priceRange: {
      type: String,
      enum: ['budget', 'mid', 'premium'],
      default: 'budget',
    },
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

FoodItemSchema.index({ citySlug: 1, popularityScore: -1 });
FoodItemSchema.index({ citySlug: 1, type: 1 });

export const FoodItem = model<FoodItemDocument>('FoodItem', FoodItemSchema);
