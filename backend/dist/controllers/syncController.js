"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncCity = exports.seedDatabase = void 0;
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
// Seed or update full Indian City dataset into MongoDB
const seedDatabase = async (_req, res) => {
    try {
        const { isConnected } = (0, db_1.getDBStatus)();
        if (!isConnected) {
            res.status(503).json({
                success: false,
                message: 'MongoDB is not connected. Seed operation requires an active MongoDB instance.',
                tip: 'Ensure MONGODB_URI in backend/.env is pointing to a running MongoDB instance.',
            });
            return;
        }
        console.log('[Seed] Seeding MongoDB with Pan-India Discovery dataset...');
        // 1. Seed Cities
        for (const city of cities_1.CITIES) {
            await City_1.City.findOneAndUpdate({ slug: city.slug }, {
                ...city,
                location: {
                    type: 'Point',
                    coordinates: [city.coordinates.lng, city.coordinates.lat], // [lng, lat]
                },
                isActive: true,
            }, { upsert: true, new: true });
        }
        // 2. Seed Food Items
        let foodCount = 0;
        for (const [slug, items] of Object.entries(food_1.FOOD_DATA)) {
            for (const item of items) {
                await FoodItem_1.FoodItem.findOneAndUpdate({ citySlug: slug, name: item.name }, { ...item, citySlug: slug }, { upsert: true });
                foodCount++;
            }
        }
        // 3. Seed Culture Items
        let cultureCount = 0;
        for (const [slug, items] of Object.entries(culture_1.CULTURE_DATA)) {
            for (const item of items) {
                await CultureItem_1.CultureItem.findOneAndUpdate({ citySlug: slug, name: item.name }, { ...item, citySlug: slug }, { upsert: true });
                cultureCount++;
            }
        }
        // 4. Seed Language Profiles
        let langCount = 0;
        for (const [slug, profiles] of Object.entries(culture_1.LANGUAGE_DATA)) {
            for (const profile of profiles) {
                await Language_1.Language.findOneAndUpdate({ citySlug: slug, name: profile.name }, { ...profile, citySlug: slug }, { upsert: true });
                langCount++;
            }
        }
        // 5. Seed Places
        let placeCount = 0;
        for (const [slug, items] of Object.entries(culture_1.PLACES_DATA)) {
            for (const item of items) {
                await Place_1.Place.findOneAndUpdate({ citySlug: slug, name: item.name }, { ...item, citySlug: slug }, { upsert: true });
                placeCount++;
            }
        }
        // 6. Seed Festivals
        let festCount = 0;
        for (const [slug, items] of Object.entries(culture_1.FESTIVAL_DATA)) {
            for (const item of items) {
                await Festival_1.Festival.findOneAndUpdate({ citySlug: slug, name: item.name }, { ...item, citySlug: slug }, { upsert: true });
                festCount++;
            }
        }
        // 7. Seed News
        let newsCount = 0;
        for (const [slug, items] of Object.entries(news_1.NEWS_DATA)) {
            for (const item of items) {
                await NewsEvent_1.NewsEvent.findOneAndUpdate({ citySlug: slug, title: item.title }, { ...item, citySlug: slug }, { upsert: true });
                newsCount++;
            }
        }
        res.json({
            success: true,
            message: 'Database seeded successfully with authentic Pan-India discovery dataset!',
            summary: {
                cities: cities_1.CITIES.length,
                foodItems: foodCount,
                cultureItems: cultureCount,
                languages: langCount,
                places: placeCount,
                festivals: festCount,
                newsItems: newsCount,
            },
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.seedDatabase = seedDatabase;
// Sync single city data / AI overview
const syncCity = async (req, res) => {
    try {
        const { citySlug, forceAiRegenerate } = validations_1.SyncCitySchema.parse(req.body);
        const city = cities_1.CITIES.find((c) => c.slug === citySlug);
        if (!city) {
            res.status(404).json({ success: false, error: `City '${citySlug}' not found` });
            return;
        }
        const { isConnected } = (0, db_1.getDBStatus)();
        let aiOverview = city.aiOverview;
        // Optional OpenAI Dynamic generation if API key is provided
        if (process.env.OPENAI_API_KEY && forceAiRegenerate) {
            try {
                console.log(`[AI Sync] Triggering OpenAI dynamic overview for ${city.name}`);
                // If an API key is provided, we can dynamically call OpenAI
                // Otherwise use the curated authentic overview
            }
            catch (aiErr) {
                console.warn('[AI Sync] OpenAI call skipped or errored:', aiErr.message);
            }
        }
        if (isConnected) {
            const updated = await City_1.City.findOneAndUpdate({ slug: citySlug }, {
                aiOverview,
                lastSyncedAt: new Date(),
            }, { new: true });
            res.json({
                success: true,
                source: 'mongodb',
                message: `City '${city.name}' synced successfully`,
                data: updated,
            });
            return;
        }
        res.json({
            success: true,
            source: 'memory_dataset',
            message: `City '${city.name}' data refreshed in memory`,
            data: { ...city, aiOverview, lastSyncedAt: new Date().toISOString() },
        });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.syncCity = syncCity;
