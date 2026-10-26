"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
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
async function runSeed() {
    console.log('[Seed CLI] Starting Pan-India City Discovery Database Seeder...');
    const connected = await (0, db_1.connectDB)();
    if (!connected) {
        console.error('[Seed CLI] Cannot seed: MongoDB connection is unavailable.');
        console.log('[Seed CLI] Please check your MONGODB_URI in backend/.env.');
        process.exit(1);
    }
    try {
        console.log(`[Seed CLI] Seeding ${cities_1.CITIES.length} Indian Cities...`);
        for (const city of cities_1.CITIES) {
            await City_1.City.findOneAndUpdate({ slug: city.slug }, {
                ...city,
                location: {
                    type: 'Point',
                    coordinates: [city.coordinates.lng, city.coordinates.lat],
                },
                isActive: true,
            }, { upsert: true, new: true });
        }
        console.log('✓ Cities seeded.');
        console.log('[Seed CLI] Seeding regional cuisines and food items...');
        for (const [slug, items] of Object.entries(food_1.FOOD_DATA)) {
            for (const item of items) {
                await FoodItem_1.FoodItem.findOneAndUpdate({ citySlug: slug, name: item.name }, { ...item, citySlug: slug }, { upsert: true });
            }
        }
        console.log('✓ Food items seeded.');
        console.log('[Seed CLI] Seeding cultural arts, heritage and traditions...');
        for (const [slug, items] of Object.entries(culture_1.CULTURE_DATA)) {
            for (const item of items) {
                await CultureItem_1.CultureItem.findOneAndUpdate({ citySlug: slug, name: item.name }, { ...item, citySlug: slug }, { upsert: true });
            }
        }
        console.log('✓ Cultural items seeded.');
        console.log('[Seed CLI] Seeding linguistic profiles and phrasebooks...');
        for (const [slug, profiles] of Object.entries(culture_1.LANGUAGE_DATA)) {
            for (const profile of profiles) {
                await Language_1.Language.findOneAndUpdate({ citySlug: slug, name: profile.name }, { ...profile, citySlug: slug }, { upsert: true });
            }
        }
        console.log('✓ Languages and phrasebooks seeded.');
        console.log('[Seed CLI] Seeding places, monuments, and attractions...');
        for (const [slug, items] of Object.entries(culture_1.PLACES_DATA)) {
            for (const item of items) {
                await Place_1.Place.findOneAndUpdate({ citySlug: slug, name: item.name }, { ...item, citySlug: slug }, { upsert: true });
            }
        }
        console.log('✓ Places and attractions seeded.');
        console.log('[Seed CLI] Seeding festivals and celebrations...');
        for (const [slug, items] of Object.entries(culture_1.FESTIVAL_DATA)) {
            for (const item of items) {
                await Festival_1.Festival.findOneAndUpdate({ citySlug: slug, name: item.name }, { ...item, citySlug: slug }, { upsert: true });
            }
        }
        console.log('✓ Festivals seeded.');
        console.log('[Seed CLI] Seeding civic and cultural news updates...');
        for (const [slug, items] of Object.entries(news_1.NEWS_DATA)) {
            for (const item of items) {
                await NewsEvent_1.NewsEvent.findOneAndUpdate({ citySlug: slug, title: item.title }, { ...item, citySlug: slug }, { upsert: true });
            }
        }
        console.log('✓ News items seeded.');
        console.log('====================================================');
        console.log('🎉 Successfully seeded MongoDB with authentic Pan-India discovery dataset!');
        console.log('====================================================');
    }
    catch (err) {
        console.error('[Seed CLI] Seeding failed with error:', err.message);
    }
    finally {
        await mongoose_1.default.disconnect();
        process.exit(0);
    }
}
runSeed();
