import { z } from 'zod';

export const CityQuerySchema = z.object({
  region: z.enum(['north', 'south', 'east', 'west', 'central', 'northeast']).optional(),
  tier: z.coerce.number().int().min(1).max(4).optional(),
  state: z.string().optional(),
  search: z.string().max(100).optional(),
  sortBy: z.enum(['name', 'population', 'tier', 'founded']).default('tier'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(20),
});

export const CitySlugParamSchema = z.object({
  slug: z.string().min(2).max(50).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
});

export const NearbyPlacesQuerySchema = z.object({
  lat: z.coerce.number().min(-90).max(90),
  lng: z.coerce.number().min(-180).max(180),
  radiusKm: z.coerce.number().positive().max(500).default(50),
  category: z.string().optional(),
  limit: z.coerce.number().int().positive().max(50).default(10),
});

export const FeedQuerySchema = z.object({
  category: z.enum(['all', 'food', 'culture', 'language', 'places', 'festivals', 'news']).default('all'),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(20),
});

export const UniversalSearchQuerySchema = z.object({
  q: z.string().min(1).max(100),
  city: z.string().optional(),
  category: z.string().optional(),
});

export const CreateBookmarkSchema = z.object({
  itemId: z.string().min(1),
  itemType: z.enum(['city', 'food', 'culture', 'language', 'place', 'festival', 'news']),
  citySlug: z.string().min(2),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  emoji: z.string().optional(),
});

export const SyncCitySchema = z.object({
  citySlug: z.string().min(2),
  forceAiRegenerate: z.boolean().optional().default(false),
});
