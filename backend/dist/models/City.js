"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.City = void 0;
const mongoose_1 = require("mongoose");
const CitySchema = new mongoose_1.Schema({
    name: { type: String, required: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    state: { type: String, required: true, index: true },
    stateCode: { type: String, required: true },
    region: {
        type: String,
        enum: ['north', 'south', 'east', 'west', 'central', 'northeast'],
        required: true,
        index: true,
    },
    tier: { type: Number, enum: [1, 2, 3, 4], required: true, index: true },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true,
        },
    },
    coordinates: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
    },
    population: { type: String, required: true },
    founded: { type: Number, required: true },
    nicknames: [{ type: String }],
    officialLanguages: [{ type: String }],
    otherLanguages: [{ type: String }],
    description: { type: String, required: true },
    aiOverview: { type: String, required: true },
    coverImage: { type: String, required: true },
    thumbnailGradient: { type: String, required: true },
    emoji: { type: String, required: true },
    tags: [{ type: String, index: true }],
    popularCategories: [{ type: String }],
    highlights: [{ type: String }],
    isActive: { type: Boolean, default: true, index: true },
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
CitySchema.index({ location: '2dsphere' });
CitySchema.index({ state: 1, tier: 1 });
exports.City = (0, mongoose_1.model)('City', CitySchema);
