"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Festival = void 0;
const mongoose_1 = require("mongoose");
const FestivalSchema = new mongoose_1.Schema({
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
FestivalSchema.index({ citySlug: 1, month: 1 });
FestivalSchema.index({ citySlug: 1, popularityScore: -1 });
exports.Festival = (0, mongoose_1.model)('Festival', FestivalSchema);
