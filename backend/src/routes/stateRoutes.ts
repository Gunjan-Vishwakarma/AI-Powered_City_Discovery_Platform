import { Router } from 'express';
import {
  getAllStates,
  getStateBySlug,
  getCitiesByState,
} from '../controllers/stateController';

const router = Router();

router.get('/', getAllStates);
router.get('/:slug', getStateBySlug);
router.get('/:slug/cities', getCitiesByState);

export default router;
