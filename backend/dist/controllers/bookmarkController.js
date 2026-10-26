"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookmark = exports.createBookmark = exports.getBookmarks = void 0;
const db_1 = require("../config/db");
const Bookmark_1 = require("../models/Bookmark");
const validations_1 = require("../validations");
// In-memory bookmark store fallback
const memoryBookmarks = new Map();
const getBookmarks = async (req, res) => {
    try {
        const userId = req.query.userId || 'guest-user';
        const { isConnected } = (0, db_1.getDBStatus)();
        if (isConnected) {
            const bookmarks = await Bookmark_1.Bookmark.find({ userId }).sort({ createdAt: -1 });
            res.json({ success: true, source: 'mongodb', data: bookmarks });
            return;
        }
        const items = Array.from(memoryBookmarks.values()).filter((b) => b.userId === userId);
        res.json({ success: true, source: 'memory_dataset', data: items });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getBookmarks = getBookmarks;
const createBookmark = async (req, res) => {
    try {
        const validated = validations_1.CreateBookmarkSchema.parse(req.body);
        const userId = req.body.userId || 'guest-user';
        const { isConnected } = (0, db_1.getDBStatus)();
        if (isConnected) {
            const existing = await Bookmark_1.Bookmark.findOne({ userId, itemId: validated.itemId });
            if (existing) {
                res.json({ success: true, message: 'Already bookmarked', data: existing });
                return;
            }
            const bookmark = await Bookmark_1.Bookmark.create({
                ...validated,
                userId,
            });
            res.status(201).json({ success: true, source: 'mongodb', data: bookmark });
            return;
        }
        const id = `bm-${Date.now()}`;
        const newBookmark = {
            id,
            userId,
            ...validated,
            savedAt: new Date().toISOString(),
        };
        memoryBookmarks.set(id, newBookmark);
        res.status(201).json({ success: true, source: 'memory_dataset', data: newBookmark });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.createBookmark = createBookmark;
const deleteBookmark = async (req, res) => {
    try {
        const id = req.params.id;
        const { isConnected } = (0, db_1.getDBStatus)();
        if (isConnected) {
            await Bookmark_1.Bookmark.findByIdAndDelete(id);
            res.json({ success: true, message: 'Bookmark removed' });
            return;
        }
        memoryBookmarks.delete(id);
        res.json({ success: true, message: 'Bookmark removed from memory' });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.deleteBookmark = deleteBookmark;
