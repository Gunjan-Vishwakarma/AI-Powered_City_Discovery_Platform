import { Request, Response } from 'express';
import { getDBStatus } from '../config/db';
import { City } from '../models/City';
import { FoodItem } from '../models/FoodItem';
import { CultureItem } from '../models/CultureItem';
import { Language } from '../models/Language';
import { Place } from '../models/Place';
import { Festival } from '../models/Festival';
import { NewsEvent } from '../models/NewsEvent';
import { CITIES } from '../data/cities';
import { FOOD_DATA } from '../data/food';
import { CULTURE_DATA, FESTIVAL_DATA, LANGUAGE_DATA, PLACES_DATA } from '../data/culture';
import { NEWS_DATA } from '../data/news';
import {
  CityQuerySchema,
  CitySlugParamSchema,
  FeedQuerySchema,
  NearbyPlacesQuerySchema,
  UniversalSearchQuerySchema,
} from '../validations';

// Helper: Haversine distance in kilometers
function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// 1. Get All Cities with Filtering, Search, Sorting & Pagination
export const getAllCities = async (req: Request, res: Response): Promise<void> => {
  try {
    const validated = CityQuerySchema.parse(req.query);
    const { region, tier, state, search, sortBy, sortOrder, page, limit } = validated;

    const { isConnected } = getDBStatus();

    if (isConnected) {
      const query: any = { isActive: true };
      if (region) query.region = region;
      if (tier) query.tier = tier;
      if (state) query.state = new RegExp(state, 'i');
      if (search) {
        query.$or = [
          { name: new RegExp(search, 'i') },
          { state: new RegExp(search, 'i') },
          { nicknames: { $in: [new RegExp(search, 'i')] } },
          { tags: { $in: [new RegExp(search, 'i')] } },
        ];
      }

      const sortOptions: any = {};
      sortOptions[sortBy === 'population' ? 'population' : sortBy] = sortOrder === 'asc' ? 1 : -1;

      const total = await City.countDocuments(query);
      const cities = await City.find(query)
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
    let filtered = [...CITIES];

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
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(term) ||
          c.state.toLowerCase().includes(term) ||
          c.nicknames.some((n) => n.toLowerCase().includes(term)) ||
          c.tags.some((t) => t.toLowerCase().includes(term))
      );
    }

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'name') comparison = a.name.localeCompare(b.name);
      else if (sortBy === 'tier') comparison = a.tier - b.tier;
      else if (sortBy === 'founded') comparison = a.founded - b.founded;
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
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// 2. Search Autocomplete
export const searchCities = async (req: Request, res: Response): Promise<void> => {
  try {
    const q = ((req.query.q as string) || '').trim().toLowerCase();
    if (!q) {
      res.json({ success: true, data: [] });
      return;
    }

    const { isConnected } = getDBStatus();

    if (isConnected) {
      const results = await City.find({
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

    const matches = CITIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.state.toLowerCase().includes(q) ||
        c.nicknames.some((n) => n.toLowerCase().includes(q))
    )
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
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// 3. Get City By Slug
export const getCityBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = CitySlugParamSchema.parse(req.params);
    const { isConnected } = getDBStatus();

    if (isConnected) {
      const city = await City.findOne({ slug });
      if (city) {
        res.json({ success: true, source: 'mongodb', data: city });
        return;
      }
    }

    const city = CITIES.find((c) => c.slug === slug);
    if (!city) {
      res.status(404).json({ success: false, error: `City '${slug}' not found` });
      return;
    }

    res.json({ success: true, source: 'memory_dataset', data: city });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// 4. Food Items
export const getCityFood = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = CitySlugParamSchema.parse(req.params);
    const type = req.query.type as string | undefined;
    const vegOnly = req.query.veg === 'true';

    const { isConnected } = getDBStatus();

    if (isConnected) {
      const query: any = { citySlug: slug };
      if (type && type !== 'all') query.type = type;
      if (vegOnly) query.isVegetarian = true;

      const items = await FoodItem.find(query).sort({ popularityScore: -1 });
      res.json({ success: true, source: 'mongodb', data: items });
      return;
    }

    let items = FOOD_DATA[slug] || [];
    if (type && type !== 'all') {
      items = items.filter((f) => f.type === type);
    }
    if (vegOnly) {
      items = items.filter((f) => f.isVegetarian);
    }

    res.json({ success: true, source: 'memory_dataset', data: items });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// 5. Culture Items
export const getCityCulture = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = CitySlugParamSchema.parse(req.params);
    const type = req.query.type as string | undefined;

    const { isConnected } = getDBStatus();

    if (isConnected) {
      const query: any = { citySlug: slug };
      if (type && type !== 'all') query.type = type;

      const items = await CultureItem.find(query).sort({ popularityScore: -1 });
      res.json({ success: true, source: 'mongodb', data: items });
      return;
    }

    let items = CULTURE_DATA[slug] || [];
    if (type && type !== 'all') {
      items = items.filter((c) => c.type === type);
    }

    res.json({ success: true, source: 'memory_dataset', data: items });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// 6. Language Profiles
export const getCityLanguage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = CitySlugParamSchema.parse(req.params);
    const { isConnected } = getDBStatus();

    if (isConnected) {
      const profiles = await Language.find({ citySlug: slug });
      if (profiles && profiles.length > 0) {
        res.json({ success: true, source: 'mongodb', data: profiles });
        return;
      }
    }

    const profiles = LANGUAGE_DATA[slug] || [];
    res.json({ success: true, source: 'memory_dataset', data: profiles });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// 7. Places & Attractions
export const getCityPlaces = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = CitySlugParamSchema.parse(req.params);
    const type = req.query.type as string | undefined;
    const hiddenGems = req.query.hiddenGems === 'true';

    const { isConnected } = getDBStatus();

    if (isConnected) {
      const query: any = { citySlug: slug };
      if (type && type !== 'all') query.type = type;
      if (hiddenGems) query.isHiddenGem = true;

      const items = await Place.find(query).sort({ popularityScore: -1 });
      res.json({ success: true, source: 'mongodb', data: items });
      return;
    }

    let items = PLACES_DATA[slug] || [];
    if (type && type !== 'all') {
      items = items.filter((p) => p.type === type);
    }
    if (hiddenGems) {
      items = items.filter((p) => p.isHiddenGem);
    }

    res.json({ success: true, source: 'memory_dataset', data: items });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// 8. Festivals
export const getCityFestivals = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = CitySlugParamSchema.parse(req.params);
    const month = req.query.month ? Number(req.query.month) : undefined;

    const { isConnected } = getDBStatus();

    if (isConnected) {
      const query: any = { citySlug: slug };
      if (month) query.month = month;

      const items = await Festival.find(query).sort({ month: 1 });
      res.json({ success: true, source: 'mongodb', data: items });
      return;
    }

    let items = FESTIVAL_DATA[slug] || [];
    if (month) {
      items = items.filter((f) => f.month === month);
    }

    res.json({ success: true, source: 'memory_dataset', data: items });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// 9. News
export const getCityNews = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = CitySlugParamSchema.parse(req.params);
    const category = req.query.category as string | undefined;

    const { isConnected } = getDBStatus();

    if (isConnected) {
      const query: any = { citySlug: slug };
      if (category && category !== 'all') query.category = category;

      const items = await NewsEvent.find(query).sort({ publishedAt: -1 });
      res.json({ success: true, source: 'mongodb', data: items });
      return;
    }

    let items = NEWS_DATA[slug] || [];
    if (category && category !== 'all') {
      items = items.filter((n) => n.category === category);
    }

    res.json({ success: true, source: 'memory_dataset', data: items });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// 10. Consolidated Discovery Feed
export const getCityFeed = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = CitySlugParamSchema.parse(req.params);
    const { category, page, limit } = FeedQuerySchema.parse(req.query);

    const city = CITIES.find((c) => c.slug === slug);
    if (!city) {
      res.status(404).json({ success: false, error: `City '${slug}' not found` });
      return;
    }

    const food = FOOD_DATA[slug] || [];
    const culture = CULTURE_DATA[slug] || [];
    const language = LANGUAGE_DATA[slug] || [];
    const places = PLACES_DATA[slug] || [];
    const festivals = FESTIVAL_DATA[slug] || [];
    const news = NEWS_DATA[slug] || [];

    let feedItems: any[] = [];

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
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// 11. Geospatial Nearby Cities & Places Search
export const getNearbyPlaces = async (req: Request, res: Response): Promise<void> => {
  try {
    const { lat, lng, radiusKm, limit } = NearbyPlacesQuerySchema.parse(req.query);

    // Calculate distance to all cities
    const nearby = CITIES.map((c) => {
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
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// 12. Universal Cross-Category Search
export const universalSearch = async (req: Request, res: Response): Promise<void> => {
  try {
    const { q, city: cityFilter } = UniversalSearchQuerySchema.parse(req.query);
    const term = q.toLowerCase();

    const matchingCities = CITIES.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        c.state.toLowerCase().includes(term) ||
        c.tags.some((t) => t.toLowerCase().includes(term))
    );

    const targetCitySlugs = cityFilter ? [cityFilter] : Object.keys(FOOD_DATA);

    const matchingFood: any[] = [];
    const matchingPlaces: any[] = [];
    const matchingCulture: any[] = [];

    for (const slug of targetCitySlugs) {
      const cityFood = FOOD_DATA[slug] || [];
      const cityPlaces = PLACES_DATA[slug] || [];
      const cityCulture = CULTURE_DATA[slug] || [];

      matchingFood.push(
        ...cityFood.filter(
          (f) =>
            f.name.toLowerCase().includes(term) ||
            f.description.toLowerCase().includes(term) ||
            f.ingredients.some((i) => i.toLowerCase().includes(term))
        )
      );

      matchingPlaces.push(
        ...cityPlaces.filter(
          (p) =>
            p.name.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term) ||
            p.neighborhood.toLowerCase().includes(term)
        )
      );

      matchingCulture.push(
        ...cityCulture.filter(
          (c) =>
            c.name.toLowerCase().includes(term) ||
            c.description.toLowerCase().includes(term) ||
            c.type.toLowerCase().includes(term)
        )
      );
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
      totalMatches:
        matchingCities.length + matchingFood.length + matchingPlaces.length + matchingCulture.length,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
