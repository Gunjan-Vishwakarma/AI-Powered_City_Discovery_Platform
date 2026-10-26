"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CultureItem = void 0;
const mongoose_1 = require("mongoose");
const CultureItemSchema = new mongoose_1.Schema({
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
CultureItemSchema.index({ citySlug: 1, popularityScore: -1 });
exports.CultureItem = (0, mongoose_1.model)('CultureItem', CultureItemSchema);
