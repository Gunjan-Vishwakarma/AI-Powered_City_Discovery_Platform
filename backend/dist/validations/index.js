"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncCitySchema = exports.CreateBookmarkSchema = exports.UniversalSearchQuerySchema = exports.FeedQuerySchema = exports.NearbyPlacesQuerySchema = exports.CitySlugParamSchema = exports.CityQuerySchema = void 0;
const zod_1 = require("zod");
exports.CityQuerySchema = zod_1.z.object({
    region: zod_1.z.enum(['north', 'south', 'east', 'west', 'central', 'northeast']).optional(),
    tier: zod_1.z.coerce.number().int().min(1).max(4).optional(),
    state: zod_1.z.string().optional(),
    search: zod_1.z.string().max(100).optional(),
    sortBy: zod_1.z.enum(['name', 'population', 'tier', 'founded']).default('tier'),
    sortOrder: zod_1.z.enum(['asc', 'desc']).default('asc'),
    page: zod_1.z.coerce.number().int().positive().default(1),
    limit: zod_1.z.coerce.number().int().positive().max(50).default(20),
});
exports.CitySlugParamSchema = zod_1.z.object({
    slug: zod_1.z.string().min(2).max(50).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
});
exports.NearbyPlacesQuerySchema = zod_1.z.object({
    lat: zod_1.z.coerce.number().min(-90).max(90),
    lng: zod_1.z.coerce.number().min(-180).max(180),
    radiusKm: zod_1.z.coerce.number().positive().max(500).default(50),
    category: zod_1.z.string().optional(),
    limit: zod_1.z.coerce.number().int().positive().max(50).default(10),
});
exports.FeedQuerySchema = zod_1.z.object({
    category: zod_1.z.enum(['all', 'food', 'culture', 'language', 'places', 'festivals', 'news']).default('all'),
    page: zod_1.z.coerce.number().int().positive().default(1),
    limit: zod_1.z.coerce.number().int().positive().max(50).default(20),
});
exports.UniversalSearchQuerySchema = zod_1.z.object({
    q: zod_1.z.string().min(1).max(100),
    city: zod_1.z.string().optional(),
    category: zod_1.z.string().optional(),
});
exports.CreateBookmarkSchema = zod_1.z.object({
    itemId: zod_1.z.string().min(1),
    itemType: zod_1.z.enum(['city', 'food', 'culture', 'language', 'place', 'festival', 'news']),
    citySlug: zod_1.z.string().min(2),
    title: zod_1.z.string().min(1),
    subtitle: zod_1.z.string().optional(),
    emoji: zod_1.z.string().optional(),
});
exports.SyncCitySchema = zod_1.z.object({
    citySlug: zod_1.z.string().min(2),
    forceAiRegenerate: zod_1.z.boolean().optional().default(false),
});
