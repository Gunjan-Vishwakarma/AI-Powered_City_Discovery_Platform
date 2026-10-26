"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Language = void 0;
const mongoose_1 = require("mongoose");
const LanguageSchema = new mongoose_1.Schema({
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
LanguageSchema.index({ citySlug: 1 });
exports.Language = (0, mongoose_1.model)('Language', LanguageSchema);
