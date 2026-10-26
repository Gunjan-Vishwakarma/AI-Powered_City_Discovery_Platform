"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bookmark = void 0;
const mongoose_1 = require("mongoose");
const BookmarkSchema = new mongoose_1.Schema({
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
BookmarkSchema.index({ userId: 1, itemId: 1 }, { unique: true });
exports.Bookmark = (0, mongoose_1.model)('Bookmark', BookmarkSchema);
