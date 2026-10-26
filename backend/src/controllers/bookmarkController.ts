import { Request, Response } from 'express';
import { getDBStatus } from '../config/db';
import { Bookmark } from '../models/Bookmark';
import { CreateBookmarkSchema } from '../validations';
import { IBookmark } from '../types';

// In-memory bookmark store fallback
const memoryBookmarks: Map<string, IBookmark> = new Map();

export const getBookmarks = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req.query.userId as string) || 'guest-user';
    const { isConnected } = getDBStatus();

    if (isConnected) {
      const bookmarks = await Bookmark.find({ userId }).sort({ createdAt: -1 });
      res.json({ success: true, source: 'mongodb', data: bookmarks });
      return;
    }

    const items = Array.from(memoryBookmarks.values()).filter((b) => b.userId === userId);
    res.json({ success: true, source: 'memory_dataset', data: items });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createBookmark = async (req: Request, res: Response): Promise<void> => {
  try {
    const validated = CreateBookmarkSchema.parse(req.body);
    const userId = (req.body.userId as string) || 'guest-user';

    const { isConnected } = getDBStatus();

    if (isConnected) {
      const existing = await Bookmark.findOne({ userId, itemId: validated.itemId });
      if (existing) {
        res.json({ success: true, message: 'Already bookmarked', data: existing });
        return;
      }

      const bookmark = await Bookmark.create({
        ...validated,
        userId,
      });

      res.status(201).json({ success: true, source: 'mongodb', data: bookmark });
      return;
    }

    const id = `bm-${Date.now()}`;
    const newBookmark: IBookmark = {
      id,
      userId,
      ...validated,
      savedAt: new Date().toISOString(),
    };

    memoryBookmarks.set(id, newBookmark);
    res.status(201).json({ success: true, source: 'memory_dataset', data: newBookmark });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const deleteBookmark = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const { isConnected } = getDBStatus();

    if (isConnected) {
      await Bookmark.findByIdAndDelete(id);
      res.json({ success: true, message: 'Bookmark removed' });
      return;
    }

    memoryBookmarks.delete(id);
    res.json({ success: true, message: 'Bookmark removed from memory' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
