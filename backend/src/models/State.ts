import { Schema, model, Document } from 'mongoose';
import { IState } from '../types';

export interface StateDocument extends Omit<IState, 'id'>, Document {}

const StateCitySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    tier: { type: Number, enum: [1, 2, 3, 4], default: 3 },
    isScraped: { type: Boolean, default: false },
  },
  { _id: false }
);

const StateSchema = new Schema<StateDocument>(
  {
    name: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    stateCode: { type: String, required: true, index: true },
    region: {
      type: String,
      enum: ['north', 'south', 'east', 'west', 'central', 'northeast'],
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ['State', 'Union Territory'],
      default: 'State',
      index: true,
    },
    capital: { type: String },
    totalCities: { type: Number, required: true, default: 0 },
    scrapedCitiesCount: { type: Number, default: 0 },
    cities: [{ type: String, required: true }],
    cityDetails: [StateCitySchema],
    description: { type: String },
    isActive: { type: Boolean, default: true, index: true },
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

StateSchema.index({ region: 1, type: 1 });

export const State = model<StateDocument>('State', StateSchema);
