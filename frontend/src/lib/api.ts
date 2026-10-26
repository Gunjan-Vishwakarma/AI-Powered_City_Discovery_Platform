import { City, CitySearchResult } from '@/types/city';
import { State } from '@/types/state';
import { FoodItem, CultureItem, LanguageProfile, PlaceItem, FestivalItem, NewsItem } from '@/types/feed';
import { CITIES, getCityBySlug as localGetCityBySlug, searchCities as localSearchCities } from '@/data/cities';
import { STATES_DATA } from '@/data/states';
import { getFoodByCity as localGetFoodByCity } from '@/data/food';
import {
  getCultureByCity as localGetCultureByCity,
  getFestivalsByCity as localGetFestivalsByCity,
  getLanguageByCity as localGetLanguageByCity,
  getPlacesByCity as localGetPlacesByCity,
} from '@/data/culture';
import { getNewsByCity as localGetNewsByCity } from '@/data/news';

// Base API URL
const API_BASE =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  (typeof window !== 'undefined' ? '/api/v1' : 'http://localhost:5000/api/v1');

async function safeFetch<T>(endpoint: string, fallback: () => T, init?: RequestInit): Promise<T> {
  try {
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`;
    const res = await fetch(url, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...init?.headers,
      },
      // Short cache or revalidation for fresh data
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.warn(`[API] Endpoint ${endpoint} returned status ${res.status}. Falling back to local data.`);
      return fallback();
    }

    const json = await res.json();
    return (json.data ?? json) as T;
  } catch (err: any) {
    console.warn(`[API] Could not connect to backend at ${endpoint} (${err.message || 'network error'}). Using local fallback.`);
    return fallback();
  }
}

// 1. Check Health
export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`, { cache: 'no-store' });
    return await res.json();
  } catch (err: any) {
    return { status: 'offline', error: err.message };
  }
}

// 2. Fetch Cities
export interface CityFilterParams {
  region?: string;
  tier?: number;
  state?: string;
  search?: string;
  sortBy?: 'name' | 'population' | 'tier' | 'founded';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export async function fetchCities(params?: CityFilterParams): Promise<City[]> {
  const query = new URLSearchParams();
  if (params?.region) query.set('region', params.region);
  if (params?.tier) query.set('tier', params.tier.toString());
  if (params?.state) query.set('state', params.state);
  if (params?.search) query.set('search', params.search);
  if (params?.sortBy) query.set('sortBy', params.sortBy);
  if (params?.sortOrder) query.set('sortOrder', params.sortOrder);
  if (params?.page) query.set('page', params.page.toString());
  if (params?.limit) query.set('limit', params.limit.toString());

  const queryString = query.toString() ? `?${query.toString()}` : '';

  return safeFetch<City[]>(
    `/cities${queryString}`,
    () => {
      let filtered = [...CITIES];
      if (params?.region) filtered = filtered.filter((c) => c.region === params.region);
      if (params?.tier) filtered = filtered.filter((c) => c.tier === params.tier);
      if (params?.state) filtered = filtered.filter((c) => c.state.toLowerCase().includes(params.state!.toLowerCase()));
      if (params?.search) {
        const q = params.search.toLowerCase();
        filtered = filtered.filter((c) => c.name.toLowerCase().includes(q) || c.state.toLowerCase().includes(q));
      }
      return filtered;
    }
  );
}

// 3. Search Autocomplete
export async function searchCitiesApi(query: string): Promise<CitySearchResult[]> {
  if (!query.trim()) return [];
  return safeFetch<CitySearchResult[]>(
    `/cities/search?q=${encodeURIComponent(query)}`,
    () => localSearchCities(query)
  );
}

// 4. Fetch Single City
export async function fetchCityBySlug(slug: string): Promise<City | undefined> {
  return safeFetch<City | undefined>(
    `/cities/${slug}`,
    () => localGetCityBySlug(slug)
  );
}

// 5. Fetch City Food
export async function fetchCityFood(slug: string, options?: { type?: string; veg?: boolean }): Promise<FoodItem[]> {
  const q = new URLSearchParams();
  if (options?.type && options.type !== 'all') q.set('type', options.type);
  if (options?.veg) q.set('veg', 'true');
  const qs = q.toString() ? `?${q.toString()}` : '';

  return safeFetch<FoodItem[]>(
    `/cities/${slug}/food${qs}`,
    () => {
      let items = localGetFoodByCity(slug);
      if (options?.type && options.type !== 'all') items = items.filter((f) => f.type === options.type);
      if (options?.veg) items = items.filter((f) => f.isVegetarian);
      return items;
    }
  );
}

// 6. Fetch City Culture
export async function fetchCityCulture(slug: string, type?: string): Promise<CultureItem[]> {
  const qs = type && type !== 'all' ? `?type=${encodeURIComponent(type)}` : '';
  return safeFetch<CultureItem[]>(
    `/cities/${slug}/culture${qs}`,
    () => {
      let items = localGetCultureByCity(slug);
      if (type && type !== 'all') items = items.filter((c) => c.type === type);
      return items;
    }
  );
}

// 7. Fetch City Language
export async function fetchCityLanguage(slug: string): Promise<LanguageProfile[]> {
  return safeFetch<LanguageProfile[]>(
    `/cities/${slug}/language`,
    () => localGetLanguageByCity(slug)
  );
}

// 8. Fetch City Places
export async function fetchCityPlaces(slug: string, options?: { type?: string; hiddenGems?: boolean }): Promise<PlaceItem[]> {
  const q = new URLSearchParams();
  if (options?.type && options.type !== 'all') q.set('type', options.type);
  if (options?.hiddenGems) q.set('hiddenGems', 'true');
  const qs = q.toString() ? `?${q.toString()}` : '';

  return safeFetch<PlaceItem[]>(
    `/cities/${slug}/places${qs}`,
    () => {
      let items = localGetPlacesByCity(slug);
      if (options?.type && options.type !== 'all') items = items.filter((p) => p.type === options.type);
      if (options?.hiddenGems) items = items.filter((p) => p.isHiddenGem);
      return items;
    }
  );
}

// 9. Fetch City Festivals
export async function fetchCityFestivals(slug: string, month?: number): Promise<FestivalItem[]> {
  const qs = month ? `?month=${month}` : '';
  return safeFetch<FestivalItem[]>(
    `/cities/${slug}/festivals${qs}`,
    () => {
      let items = localGetFestivalsByCity(slug);
      if (month) items = items.filter((f) => f.month === month);
      return items;
    }
  );
}

// 10. Fetch City News
export async function fetchCityNews(slug: string, category?: string): Promise<NewsItem[]> {
  const qs = category && category !== 'all' ? `?category=${encodeURIComponent(category)}` : '';
  return safeFetch<NewsItem[]>(
    `/cities/${slug}/news${qs}`,
    () => {
      let items = localGetNewsByCity(slug);
      if (category && category !== 'all') items = items.filter((n) => n.category === category);
      return items;
    }
  );
}

// 11. Fetch Nearby Places
export async function fetchNearbyPlaces(lat: number, lng: number, radiusKm: number = 50) {
  return safeFetch<any[]>(
    `/cities/nearby?lat=${lat}&lng=${lng}&radiusKm=${radiusKm}`,
    () => []
  );
}

// 12. Universal Search
export async function fetchUniversalSearch(query: string, city?: string) {
  const q = new URLSearchParams({ q: query });
  if (city) q.set('city', city);
  return safeFetch<any>(
    `/cities/universal-search?${q.toString()}`,
    () => ({ cities: [], food: [], places: [], culture: [] })
  );
}

// 13. Bookmarks
export async function fetchBookmarks(userId: string = 'guest-user') {
  return safeFetch<any[]>(
    `/bookmarks?userId=${encodeURIComponent(userId)}`,
    () => []
  );
}

export async function createBookmarkApi(bookmark: {
  itemId: string;
  itemType: string;
  citySlug: string;
  title: string;
  subtitle?: string;
  emoji?: string;
  userId?: string;
}) {
  try {
    const res = await fetch(`${API_BASE}/bookmarks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookmark),
    });
    return await res.json();
  } catch (err: any) {
    console.warn('[API] Could not save bookmark to backend:', err.message);
    return { success: false, error: err.message };
  }
}

export async function deleteBookmarkApi(id: string) {
  try {
    const res = await fetch(`${API_BASE}/bookmarks/${id}`, {
      method: 'DELETE',
    });
    return await res.json();
  } catch (err: any) {
    console.warn('[API] Could not delete bookmark from backend:', err.message);
    return { success: false, error: err.message };
  }
}

// 12. Fetch All States and their Cities
export async function fetchStates(params?: { region?: string; type?: string; search?: string }): Promise<State[]> {
  const query = new URLSearchParams();
  if (params?.region && params.region !== 'all') query.set('region', params.region);
  if (params?.type && params.type !== 'all') query.set('type', params.type);
  if (params?.search) query.set('search', params.search);

  const qs = query.toString() ? `?${query.toString()}` : '';

  return safeFetch<State[]>(`/states${qs}`, () => {
    let list = [...STATES_DATA];
    if (params?.region && params.region !== 'all') {
      list = list.filter((s) => s.region.toLowerCase() === params.region!.toLowerCase());
    }
    if (params?.type && params.type !== 'all') {
      list = list.filter((s) => s.type.toLowerCase() === params.type!.toLowerCase());
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.stateCode.toLowerCase().includes(q) ||
          s.cities.some((c) => c.toLowerCase().includes(q))
      );
    }
    return list;
  });
}

// 13. Fetch State by Slug
export async function fetchStateBySlug(slug: string): Promise<State | null> {
  return safeFetch<State | null>(`/states/${slug}`, () => {
    const clean = slug.toLowerCase();
    const found = STATES_DATA.find(
      (s) =>
        s.slug === clean ||
        s.stateCode.toLowerCase() === clean ||
        s.name.toLowerCase() === clean.replace(/-/g, ' ')
    );
    return found || null;
  });
}

