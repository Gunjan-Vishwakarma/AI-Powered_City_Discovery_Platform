"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Place = void 0;
const mongoose_1 = require("mongoose");
const PlaceSchema = new mongoose_1.Schema({
    citySlug: { type: String, required: true, index: true },
    name: { type: String, required: true, index: true },
    type: {
        type: String,
        enum: [
            'monument',
            'temple',
            'museum',
            'park',
            'market',
            'beach',
            'fort',
            'palace',
            'natural',
            'hidden_gem',
            'viewpoint',
            'ghat',
        ],
        required: true,
        index: true,
    },
    isHiddenGem: { type: Boolean, default: false, index: true },
    isUnescoHeritage: { type: Boolean, default: false, index: true },
    isAsiProtected: { type: Boolean, default: false },
    neighborhood: { type: String, required: true },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
            type: [Number], // [lng, lat]
        },
    },
    entryFee: {
        indian: { type: Number, default: 0 },
        foreigner: { type: Number, default: 0 },
    },
    bestTimeToVisit: { type: String, required: true },
    rating: { type: Number, default: 4.5 },
    description: { type: String, required: true },
    aiSummary: { type: String, required: true },
    historicalPeriod: { type: String, required: true },
    popularityScore: { type: Number, default: 85, index: -1 },
    emoji: { type: String, required: true },
    tags: [{ type: String, index: true }],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (_, ret) => {
            ret.id = ret._id.toString();
            delete ret._id;
            delete ret.__v;
            return ret;
        },
    },
});
PlaceSchema.index({ citySlug: 1, popularityScore: -1 });
PlaceSchema.index({ location: '2dsphere' });
exports.Place = (0, mongoose_1.model)('Place', PlaceSchema);
