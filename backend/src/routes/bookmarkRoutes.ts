import { Router } from 'express';
import { getBookmarks, createBookmark, deleteBookmark } from '../controllers/bookmarkController';

const router = Router();

router.get('/', getBookmarks);
router.post('/', createBookmark);
router.delete('/:id', deleteBookmark);

export default router;
