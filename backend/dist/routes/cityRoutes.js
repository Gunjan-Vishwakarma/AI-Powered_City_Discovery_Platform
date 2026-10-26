"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cityController_1 = require("../controllers/cityController");
const router = (0, express_1.Router)();
// Specific routes first to prevent slug collision
router.get('/search', cityController_1.searchCities);
router.get('/universal-search', cityController_1.universalSearch);
router.get('/nearby', cityController_1.getNearbyPlaces);
// City list & individual city routes
router.get('/', cityController_1.getAllCities);
router.get('/:slug', cityController_1.getCityBySlug);
router.get('/:slug/food', cityController_1.getCityFood);
router.get('/:slug/culture', cityController_1.getCityCulture);
router.get('/:slug/language', cityController_1.getCityLanguage);
router.get('/:slug/places', cityController_1.getCityPlaces);
router.get('/:slug/festivals', cityController_1.getCityFestivals);
router.get('/:slug/news', cityController_1.getCityNews);
router.get('/:slug/feed', cityController_1.getCityFeed);
exports.default = router;
