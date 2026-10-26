import { Router } from 'express';
import { seedDatabase, syncCity } from '../controllers/syncController';

const router = Router();

router.post('/seed', seedDatabase);
router.post('/city', syncCity);

export default router;
