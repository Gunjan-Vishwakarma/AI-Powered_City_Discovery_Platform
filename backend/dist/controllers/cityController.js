"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.universalSearch = exports.getNearbyPlaces = exports.getCityFeed = exports.getCityNews = exports.getCityFestivals = exports.getCityPlaces = exports.getCityLanguage = exports.getCityCulture = exports.getCityFood = exports.getCityBySlug = exports.searchCities = exports.getAllCities = void 0;
const db_1 = require("../config/db");
const City_1 = require("../models/City");
const FoodItem_1 = require("../models/FoodItem");
const CultureItem_1 = require("../models/CultureItem");
const Language_1 = require("../models/Language");
const Place_1 = require("../models/Place");
const Festival_1 = require("../models/Festival");
const NewsEvent_1 = require("../models/NewsEvent");
const cities_1 = require("../data/cities");
const food_1 = require("../data/food");
const culture_1 = require("../data/culture");
const news_1 = require("../data/news");
const validations_1 = require("../validations");
// Helper: Haversine distance in kilometers
function calculateDistanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}
// 1. Get All Cities with Filtering, Search, Sorting & Pagination
const getAllCities = async (req, res) => {
    try {
        const validated = validations_1.CityQuerySchema.parse(req.query);
        const { region, tier, state, search, sortBy, sortOrder, page, limit } = validated;
        const { isConnected } = (0, db_1.getDBStatus)();
        if (isConnected) {
            const query = { isActive: true };
            if (region)
                query.region = region;
            if (tier)
                query.tier = tier;
            if (state)
                query.state = new RegExp(state, 'i');
            if (search) {
                query.$or = [
                    { name: new RegExp(search, 'i') },
                    { state: new RegExp(search, 'i') },
                    { nicknames: { $in: [new RegExp(search, 'i')] } },
                    { tags: { $in: [new RegExp(search, 'i')] } },
                ];
            }
            const sortOptions = {};
            sortOptions[sortBy === 'population' ? 'population' : sortBy] = sortOrder === 'asc' ? 1 : -1;
            const total = await City_1.City.countDocuments(query);
            const cities = await City_1.City.find(query)
                .sort(sortOptions)
                .skip((page - 1) * limit)
                .limit(limit);
            res.json({
                success: true,
                source: 'mongodb',
                data: cities,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit),
                },
            });
            return;
        }
        // Fallback: In-memory dataset
        let filtered = [...cities_1.CITIES];
        if (region) {
            filtered = filtered.filter((c) => c.region === region);
        }
        if (tier) {
            filtered = filtered.filter((c) => c.tier === tier);
        }
        if (state) {
            filtered = filtered.filter((c) => c.state.toLowerCase().includes(state.toLowerCase()));
        }
        if (search) {
            const term = search.toLowerCase();
            filtered = filtered.filter((c) => c.name.toLowerCase().includes(term) ||
                c.state.toLowerCase().includes(term) ||
                c.nicknames.some((n) => n.toLowerCase().includes(term)) ||
                c.tags.some((t) => t.toLowerCase().includes(term)));
        }
        // Sort
        filtered.sort((a, b) => {
            let comparison = 0;
            if (sortBy === 'name')
                comparison = a.name.localeCompare(b.name);
            else if (sortBy === 'tier')
                comparison = a.tier - b.tier;
            else if (sortBy === 'founded')
                comparison = a.founded - b.founded;
            return sortOrder === 'asc' ? comparison : -comparison;
        });
        const total = filtered.length;
        const paginated = filtered.slice((page - 1) * limit, page * limit);
        res.json({
            success: true,
            source: 'memory_dataset',
            data: paginated,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.getAllCities = getAllCities;
// 2. Search Autocomplete
const searchCities = async (req, res) => {
    try {
        const q = (req.query.q || '').trim().toLowerCase();
        if (!q) {
            res.json({ success: true, data: [] });
            return;
        }
        const { isConnected } = (0, db_1.getDBStatus)();
        if (isConnected) {
            const results = await City_1.City.find({
                $or: [
                    { name: new RegExp(q, 'i') },
                    { state: new RegExp(q, 'i') },
                    { nicknames: { $in: [new RegExp(q, 'i')] } },
                ],
            })
                .select('name slug state stateCode emoji tier')
                .limit(10);
            res.json({ success: true, source: 'mongodb', data: results });
            return;
        }
        const matches = cities_1.CITIES.filter((c) => c.name.toLowerCase().includes(q) ||
            c.state.toLowerCase().includes(q) ||
            c.nicknames.some((n) => n.toLowerCase().includes(q)))
            .slice(0, 10)
            .map((c) => ({
            id: c.id,
            name: c.name,
            slug: c.slug,
            state: c.state,
            stateCode: c.stateCode,
            emoji: c.emoji,
            tier: c.tier,
        }));
        res.json({ success: true, source: 'memory_dataset', data: matches });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.searchCities = searchCities;
// 3. Get City By Slug
const getCityBySlug = async (req, res) => {
    try {
        const { slug } = validations_1.CitySlugParamSchema.parse(req.params);
        const { isConnected } = (0, db_1.getDBStatus)();
        if (isConnected) {
            const city = await City_1.City.findOne({ slug });
            if (city) {
                res.json({ success: true, source: 'mongodb', data: city });
                return;
            }
        }
        const city = cities_1.CITIES.find((c) => c.slug === slug);
        if (!city) {
            res.status(404).json({ success: false, error: `City '${slug}' not found` });
            return;
        }
        res.json({ success: true, source: 'memory_dataset', data: city });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.getCityBySlug = getCityBySlug;
// 4. Food Items
const getCityFood = async (req, res) => {
    try {
        const { slug } = validations_1.CitySlugParamSchema.parse(req.params);
        const type = req.query.type;
        const vegOnly = req.query.veg === 'true';
        const { isConnected } = (0, db_1.getDBStatus)();
        if (isConnected) {
            const query = { citySlug: slug };
            if (type && type !== 'all')
                query.type = type;
            if (vegOnly)
                query.isVegetarian = true;
            const items = await FoodItem_1.FoodItem.find(query).sort({ popularityScore: -1 });
            res.json({ success: true, source: 'mongodb', data: items });
            return;
        }
        let items = food_1.FOOD_DATA[slug] || [];
        if (type && type !== 'all') {
            items = items.filter((f) => f.type === type);
        }
        if (vegOnly) {
            items = items.filter((f) => f.isVegetarian);
        }
        res.json({ success: true, source: 'memory_dataset', data: items });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.getCityFood = getCityFood;
// 5. Culture Items
const getCityCulture = async (req, res) => {
    try {
        const { slug } = validations_1.CitySlugParamSchema.parse(req.params);
        const type = req.query.type;
        const { isConnected } = (0, db_1.getDBStatus)();
        if (isConnected) {
            const query = { citySlug: slug };
            if (type && type !== 'all')
                query.type = type;
            const items = await CultureItem_1.CultureItem.find(query).sort({ popularityScore: -1 });
            res.json({ success: true, source: 'mongodb', data: items });
            return;
        }
        let items = culture_1.CULTURE_DATA[slug] || [];
        if (type && type !== 'all') {
            items = items.filter((c) => c.type === type);
        }
        res.json({ success: true, source: 'memory_dataset', data: items });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.getCityCulture = getCityCulture;
// 6. Language Profiles
const getCityLanguage = async (req, res) => {
    try {
        const { slug } = validations_1.CitySlugParamSchema.parse(req.params);
        const { isConnected } = (0, db_1.getDBStatus)();
        if (isConnected) {
            const profiles = await Language_1.Language.find({ citySlug: slug });
            if (profiles && profiles.length > 0) {
                res.json({ success: true, source: 'mongodb', data: profiles });
                return;
            }
        }
        const profiles = culture_1.LANGUAGE_DATA[slug] || [];
        res.json({ success: true, source: 'memory_dataset', data: profiles });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.getCityLanguage = getCityLanguage;
// 7. Places & Attractions
const getCityPlaces = async (req, res) => {
    try {
        const { slug } = validations_1.CitySlugParamSchema.parse(req.params);
        const type = req.query.type;
        const hiddenGems = req.query.hiddenGems === 'true';
        const { isConnected } = (0, db_1.getDBStatus)();
        if (isConnected) {
            const query = { citySlug: slug };
            if (type && type !== 'all')
                query.type = type;
            if (hiddenGems)
                query.isHiddenGem = true;
            const items = await Place_1.Place.find(query).sort({ popularityScore: -1 });
            res.json({ success: true, source: 'mongodb', data: items });
            return;
        }
        let items = culture_1.PLACES_DATA[slug] || [];
        if (type && type !== 'all') {
            items = items.filter((p) => p.type === type);
        }
        if (hiddenGems) {
            items = items.filter((p) => p.isHiddenGem);
        }
        res.json({ success: true, source: 'memory_dataset', data: items });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.getCityPlaces = getCityPlaces;
// 8. Festivals
const getCityFestivals = async (req, res) => {
    try {
        const { slug } = validations_1.CitySlugParamSchema.parse(req.params);
        const month = req.query.month ? Number(req.query.month) : undefined;
        const { isConnected } = (0, db_1.getDBStatus)();
        if (isConnected) {
            const query = { citySlug: slug };
            if (month)
                query.month = month;
            const items = await Festival_1.Festival.find(query).sort({ month: 1 });
            res.json({ success: true, source: 'mongodb', data: items });
            return;
        }
        let items = culture_1.FESTIVAL_DATA[slug] || [];
        if (month) {
            items = items.filter((f) => f.month === month);
        }
        res.json({ success: true, source: 'memory_dataset', data: items });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.getCityFestivals = getCityFestivals;
// 9. News
const getCityNews = async (req, res) => {
    try {
        const { slug } = validations_1.CitySlugParamSchema.parse(req.params);
        const category = req.query.category;
        const { isConnected } = (0, db_1.getDBStatus)();
        if (isConnected) {
            const query = { citySlug: slug };
            if (category && category !== 'all')
                query.category = category;
            const items = await NewsEvent_1.NewsEvent.find(query).sort({ publishedAt: -1 });
            res.json({ success: true, source: 'mongodb', data: items });
            return;
        }
        let items = news_1.NEWS_DATA[slug] || [];
        if (category && category !== 'all') {
            items = items.filter((n) => n.category === category);
        }
        res.json({ success: true, source: 'memory_dataset', data: items });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.getCityNews = getCityNews;
// 10. Consolidated Discovery Feed
const getCityFeed = async (req, res) => {
    try {
        const { slug } = validations_1.CitySlugParamSchema.parse(req.params);
        const { category, page, limit } = validations_1.FeedQuerySchema.parse(req.query);
        const city = cities_1.CITIES.find((c) => c.slug === slug);
        if (!city) {
            res.status(404).json({ success: false, error: `City '${slug}' not found` });
            return;
        }
        const food = food_1.FOOD_DATA[slug] || [];
        const culture = culture_1.CULTURE_DATA[slug] || [];
        const language = culture_1.LANGUAGE_DATA[slug] || [];
        const places = culture_1.PLACES_DATA[slug] || [];
        const festivals = culture_1.FESTIVAL_DATA[slug] || [];
        const news = news_1.NEWS_DATA[slug] || [];
        let feedItems = [];
        if (category === 'all' || category === 'food') {
            feedItems.push(...food.map((f) => ({ ...f, pillar: 'food' })));
        }
        if (category === 'all' || category === 'culture') {
            feedItems.push(...culture.map((c) => ({ ...c, pillar: 'culture' })));
        }
        if (category === 'all' || category === 'language') {
            feedItems.push(...language.map((l) => ({ ...l, pillar: 'language' })));
        }
        if (category === 'all' || category === 'places') {
            feedItems.push(...places.map((p) => ({ ...p, pillar: 'places' })));
        }
        if (category === 'all' || category === 'festivals') {
            feedItems.push(...festivals.map((f) => ({ ...f, pillar: 'festivals' })));
        }
        if (category === 'all' || category === 'news') {
            feedItems.push(...news.map((n) => ({ ...n, pillar: 'news' })));
        }
        // Sort by popularity score descending
        feedItems.sort((a, b) => (b.popularityScore || 50) - (a.popularityScore || 50));
        const total = feedItems.length;
        const paginated = feedItems.slice((page - 1) * limit, page * limit);
        res.json({
            success: true,
            city: {
                name: city.name,
                slug: city.slug,
                state: city.state,
                emoji: city.emoji,
            },
            data: paginated,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.getCityFeed = getCityFeed;
// 11. Geospatial Nearby Cities & Places Search
const getNearbyPlaces = async (req, res) => {
    try {
        const { lat, lng, radiusKm, limit } = validations_1.NearbyPlacesQuerySchema.parse(req.query);
        // Calculate distance to all cities
        const nearby = cities_1.CITIES.map((c) => {
            const dist = calculateDistanceKm(lat, lng, c.coordinates.lat, c.coordinates.lng);
            return {
                ...c,
                distanceKm: Math.round(dist * 10) / 10,
            };
        })
            .filter((c) => c.distanceKm <= radiusKm)
            .sort((a, b) => a.distanceKm - b.distanceKm)
            .slice(0, limit);
        res.json({
            success: true,
            center: { lat, lng },
            radiusKm,
            count: nearby.length,
            data: nearby,
        });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.getNearbyPlaces = getNearbyPlaces;
// 12. Universal Cross-Category Search
const universalSearch = async (req, res) => {
    try {
        const { q, city: cityFilter } = validations_1.UniversalSearchQuerySchema.parse(req.query);
        const term = q.toLowerCase();
        const matchingCities = cities_1.CITIES.filter((c) => c.name.toLowerCase().includes(term) ||
            c.state.toLowerCase().includes(term) ||
            c.tags.some((t) => t.toLowerCase().includes(term)));
        const targetCitySlugs = cityFilter ? [cityFilter] : Object.keys(food_1.FOOD_DATA);
        const matchingFood = [];
        const matchingPlaces = [];
        const matchingCulture = [];
        for (const slug of targetCitySlugs) {
            const cityFood = food_1.FOOD_DATA[slug] || [];
            const cityPlaces = culture_1.PLACES_DATA[slug] || [];
            const cityCulture = culture_1.CULTURE_DATA[slug] || [];
            matchingFood.push(...cityFood.filter((f) => f.name.toLowerCase().includes(term) ||
                f.description.toLowerCase().includes(term) ||
                f.ingredients.some((i) => i.toLowerCase().includes(term))));
            matchingPlaces.push(...cityPlaces.filter((p) => p.name.toLowerCase().includes(term) ||
                p.description.toLowerCase().includes(term) ||
                p.neighborhood.toLowerCase().includes(term)));
            matchingCulture.push(...cityCulture.filter((c) => c.name.toLowerCase().includes(term) ||
                c.description.toLowerCase().includes(term) ||
                c.type.toLowerCase().includes(term)));
        }
        res.json({
            success: true,
            query: q,
            results: {
                cities: matchingCities.slice(0, 5),
                food: matchingFood.slice(0, 8),
                places: matchingPlaces.slice(0, 8),
                culture: matchingCulture.slice(0, 8),
            },
            totalMatches: matchingCities.length + matchingFood.length + matchingPlaces.length + matchingCulture.length,
        });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.universalSearch = universalSearch;
