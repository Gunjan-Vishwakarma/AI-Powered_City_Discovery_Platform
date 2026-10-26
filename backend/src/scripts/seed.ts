import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { connectDB } from '../config/db';
import { City } from '../models/City';
import { FoodItem } from '../models/FoodItem';
import { CultureItem } from '../models/CultureItem';
import { Language } from '../models/Language';
import { Place } from '../models/Place';
import { Festival } from '../models/Festival';
import { NewsEvent } from '../models/NewsEvent';
import { State } from '../models/State';
import { CITIES } from '../data/cities';
import { STATES_DATA } from '../data/states';
import { FOOD_DATA } from '../data/food';
import { CULTURE_DATA, FESTIVAL_DATA, LANGUAGE_DATA, PLACES_DATA } from '../data/culture';
import { NEWS_DATA } from '../data/news';

async function runSeed() {
  console.log('[Seed CLI] Starting Pan-India City Discovery Database Seeder...');
  const connected = await connectDB();

  if (!connected) {
    console.error('[Seed CLI] Cannot seed: MongoDB connection is unavailable.');
    console.log('[Seed CLI] Please check your MONGODB_URI in backend/.env.');
    process.exit(1);
  }

  try {
    console.log(`[Seed CLI] Seeding ${CITIES.length} Indian Cities...`);
    for (const city of CITIES) {
      await City.findOneAndUpdate(
        { slug: city.slug },
        {
          ...city,
          location: {
            type: 'Point',
            coordinates: [city.coordinates.lng, city.coordinates.lat],
          },
          isActive: true,
        },
        { upsert: true, new: true }
      );
    }
    console.log('✓ Cities seeded.');

    console.log('[Seed CLI] Seeding regional cuisines and food items...');
    for (const [slug, items] of Object.entries(FOOD_DATA)) {
      for (const item of items) {
        await FoodItem.findOneAndUpdate(
          { citySlug: slug, name: item.name },
          { ...item, citySlug: slug },
          { upsert: true }
        );
      }
    }
    console.log('✓ Food items seeded.');

    console.log('[Seed CLI] Seeding cultural arts, heritage and traditions...');
    for (const [slug, items] of Object.entries(CULTURE_DATA)) {
      for (const item of items) {
        await CultureItem.findOneAndUpdate(
          { citySlug: slug, name: item.name },
          { ...item, citySlug: slug },
          { upsert: true }
        );
      }
    }
    console.log('✓ Cultural items seeded.');

    console.log('[Seed CLI] Seeding linguistic profiles and phrasebooks...');
    for (const [slug, profiles] of Object.entries(LANGUAGE_DATA)) {
      for (const profile of profiles) {
        await Language.findOneAndUpdate(
          { citySlug: slug, name: profile.name },
          { ...profile, citySlug: slug },
          { upsert: true }
        );
      }
    }
    console.log('✓ Languages and phrasebooks seeded.');

    console.log('[Seed CLI] Seeding places, monuments, and attractions...');
    for (const [slug, items] of Object.entries(PLACES_DATA)) {
      const city = CITIES.find((c) => c.slug === slug);
      for (const item of items) {
        const placeData: any = { ...item, citySlug: slug };
        if (city?.coordinates) {
          placeData.location = {
            type: 'Point',
            coordinates: [city.coordinates.lng, city.coordinates.lat],
          };
        }
        await Place.findOneAndUpdate(
          { citySlug: slug, name: item.name },
          placeData,
          { upsert: true }
        );
      }
    }
    console.log('✓ Places and attractions seeded.');

    console.log('[Seed CLI] Seeding festivals and celebrations...');
    for (const [slug, items] of Object.entries(FESTIVAL_DATA)) {
      for (const item of items) {
        await Festival.findOneAndUpdate(
          { citySlug: slug, name: item.name },
          { ...item, citySlug: slug },
          { upsert: true }
        );
      }
    }
    console.log('✓ Festivals seeded.');

    console.log('[Seed CLI] Seeding civic and cultural news updates...');
    for (const [slug, items] of Object.entries(NEWS_DATA)) {
      for (const item of items) {
        await NewsEvent.findOneAndUpdate(
          { citySlug: slug, title: item.title },
          { ...item, citySlug: slug },
          { upsert: true }
        );
      }
    }
    console.log('✓ News items seeded.');

    console.log(`[Seed CLI] Seeding ${STATES_DATA.length} Indian States & Union Territories (with 1,400+ cities)...`);
    for (const state of STATES_DATA) {
      await State.findOneAndUpdate(
        { slug: state.slug },
        { ...state },
        { upsert: true, new: true }
      );
    }
    console.log('✓ States & Cities collection seeded.');

    console.log('====================================================');
    console.log('🎉 Successfully seeded MongoDB with authentic Pan-India discovery dataset!');
    console.log('====================================================');
  } catch (err: any) {
    console.error('[Seed CLI] Seeding failed with error:', err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

runSeed();
