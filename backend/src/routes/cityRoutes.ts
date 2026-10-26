import { Router } from 'express';
import {
  getAllCities,
  searchCities,
  getCityBySlug,
  getCityFood,
  getCityCulture,
  getCityLanguage,
  getCityPlaces,
  getCityFestivals,
  getCityNews,
  getCityFeed,
  getNearbyPlaces,
  universalSearch,
} from '../controllers/cityController';

const router = Router();

// Specific routes first to prevent slug collision
router.get('/search', searchCities);
router.get('/universal-search', universalSearch);
router.get('/nearby', getNearbyPlaces);

// City list & individual city routes
router.get('/', getAllCities);
router.get('/:slug', getCityBySlug);
router.get('/:slug/food', getCityFood);
router.get('/:slug/culture', getCityCulture);
router.get('/:slug/language', getCityLanguage);
router.get('/:slug/places', getCityPlaces);
router.get('/:slug/festivals', getCityFestivals);
router.get('/:slug/news', getCityNews);
router.get('/:slug/feed', getCityFeed);

export default router;
