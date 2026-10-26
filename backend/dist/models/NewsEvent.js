"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsEvent = void 0;
const mongoose_1 = require("mongoose");
const NewsEventSchema = new mongoose_1.Schema({
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
NewsEventSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL Auto cleanup
NewsEventSchema.index({ citySlug: 1, popularityScore: -1 });
exports.NewsEvent = (0, mongoose_1.model)('NewsEvent', NewsEventSchema);
