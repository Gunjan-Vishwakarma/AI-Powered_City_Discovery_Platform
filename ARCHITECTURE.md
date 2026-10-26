# AI-Powered India City Discovery Platform - Full Architecture

> Scoped exclusively to cities within India. Covers culture, language, food, places, festivals, news.

---

## Table of Contents

1. [Project Vision and Scope](#1-project-vision-and-scope)
2. [High-Level System Architecture](#2-high-level-system-architecture)
3. [Technology Stack](#3-technology-stack)
4. [Frontend Architecture](#4-frontend-architecture)
5. [Backend Architecture](#5-backend-architecture)
6. [Database Schema Design](#6-database-schema-design)
7. [AI and Data Pipeline](#7-ai-and-data-pipeline)
8. [API Endpoints Specification](#8-api-endpoints-specification)
9. [Indian Cities and Categories Coverage](#9-indian-cities-and-categories-coverage)
10. [State Management and Data Flow](#10-state-management-and-data-flow)
11. [Performance and Rendering Strategy](#11-performance-and-rendering-strategy)
12. [Security, Rate Limiting and Guardrails](#12-security-rate-limiting-and-guardrails)
13. [Project Directory Structure](#13-project-directory-structure)
14. [Deployment Architecture](#14-deployment-architecture)
15. [Development Roadmap](#15-development-roadmap)

---

## 1. Project Vision and Scope

### Mission
Build a **single, authoritative discovery platform** for every Indian city - letting users explore the soul of India's diverse urban landscape through rich AI-powered content across food, culture, language, places, festivals, and local news.

### Geographic Scope - India Only

This platform is **exclusively scoped to cities within India**. No international cities are included.

| Tier | Cities |
|------|--------|
| **Tier 1 Metro** | Mumbai, Delhi, Bengaluru, Chennai, Kolkata, Hyderabad |
| **Tier 2 Major** | Pune, Ahmedabad, Jaipur, Lucknow, Surat, Chandigarh, Kochi, Indore, Bhopal, Nagpur |
| **Tier 3 Heritage** | Varanasi, Amritsar, Mysuru, Udaipur, Agra, Jodhpur, Rishikesh, Hampi, Madurai, Puri |
| **Tier 4 Emerging** | Coimbatore, Vizag, Patna, Ranchi, Guwahati, Shillong, Dehradun, Thiruvananthapuram |

### Discovery Categories

Every city page covers **6 core discovery pillars**:

| # | Category | What It Covers |
|---|----------|----------------|
| 1 | **Food and Cuisine** | Local dishes, street food, restaurants, regional specialties, food trails |
| 2 | **Culture and Arts** | Classical arts, theatre, painting styles, handicrafts, local traditions |
| 3 | **Language and Dialect** | Official language, local dialect, common phrases, script, linguistic history |
| 4 | **Places and Attractions** | Monuments, temples, parks, museums, hidden gems, viewpoints |
| 5 | **Festivals and Events** | Local festivals, melas, cultural events, seasonal celebrations |
| 6 | **News and Trending** | Local city news, trending stories, civic updates, community highlights |

---

## 2. High-Level System Architecture

```
+------------------------------------------------------------------+
|                   USER (Browser / Mobile Web)                    |
+------------------------------+-----------------------------------+
                               | HTTPS
                               v
+------------------------------------------------------------------+
|              Next.js 14 App (Vercel - Mumbai Region)             |
|                                                                  |
|  +------------------+  +-----------------+  +----------------+  |
|  | Server Components|  | Client Components|  | Route Handlers |  |
|  | (SSR / ISR Pages)|  | (Interactive UI) |  | (BFF API Layer)|  |
|  +--------+---------+  +--------+--------+  +-------+--------+  |
|           |                     |                    |           |
|           +---------------------+--------------------+           |
|                                 |                                |
|           +---------------------v-----------+                    |
|           |  TanStack Query v5 (Data Layer) |                    |
|           |  Zustand (Client UI State)       |                    |
|           +---------------------------------+                    |
+------------------------------+-----------------------------------+
                               |
           +-------------------+-------------------+
           |                   |                   |
           v                   v                   v
+------------------+ +----------------+ +---------------------------+
|  MongoDB Atlas   | | Upstash Redis  | |   External Data Sources   |
|  Mumbai Region   | | Cache + Limits | |                           |
|                  | +----------------+ |  Google Places API        |
|  Collections:    |                   |  (Indian POIs only)       |
|  - cities        |                   |  Wikipedia / Wikidata     |
|  - food_items    |                   |  (Culture + Language)     |
|  - restaurants   |                   |  NewsAPI / Tavily         |
|  - culture_items |                   |  (Indian news sources)    |
|  - languages     |                   |  OpenAI GPT-4o-mini       |
|  - places        |                   |  (Summaries + RAG)        |
|  - festivals     |                   |  Zomato / Swiggy API      |
|  - news_events   |                   |  (Restaurants + Food)     |
|  - users         |                   |  ASI / Incredible India   |
+------------------+                   |  (Heritage Site Data)     |
                                       +---------------------------+
```

---

## 3. Technology Stack

### Frontend

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | **Next.js 14+** (App Router) | SSR, ISR, file-based routing |
| Language | **TypeScript 5.x** | Type safety across UI and API contracts |
| Styling | **Vanilla CSS** (Custom design system) | Off-green glassmorphism theme |
| Fonts | **Inter + Outfit** (Google Fonts) | Premium typography |
| Server State | **TanStack Query v5** | API caching, deduplication, infinite scroll |
| Client State | **Zustand** | Filters, active tabs, map toggles |
| Map | **Leaflet.js + React-Leaflet** | Interactive POI map |
| Icons | **Lucide React** | Consistent icon system |
| Animations | **CSS Keyframes** | Micro-animations and transitions |

### Backend

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Runtime | **Node.js** via Next.js Route Handlers | BFF API layer |
| Database | **MongoDB Atlas** | Flexible document store + geo-spatial indexing |
| ODM | **Mongoose 8.x** | Schema modeling and validation |
| Cache | **Upstash Redis** | Response caching and sliding window rate limiting |
| Auth | **Auth.js / NextAuth v5** | Google OAuth with MongoDB session adapter |
| Validation | **Zod** | API input validation schemas |
| AI Engine | **OpenAI API** (gpt-4o-mini + text-embedding-3-small) | Summaries, RAG, vector search |

### DevOps and Infrastructure

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Hosting | **Vercel** | Next.js edge deployment (Mumbai region) |
| DB Hosting | **MongoDB Atlas M10** (Mumbai ap-south-1) | Low-latency for Indian users |
| Cache | **Upstash** | Serverless Redis, globally replicated |
| Media | **Cloudinary** | Image CDN with Indian city photos |
| Monitoring | **Sentry + Vercel Analytics** | Error tracking and Web Vitals |
| Cron | **Vercel Cron** | Scheduled data sync pipeline |

---

## 4. Frontend Architecture

### Page Structure

```
src/app/
|-- page.tsx                           Landing page (city search hero + featured cities)
|-- layout.tsx                         Root layout (Navbar, Fonts, TanStack Provider)
|-- globals.css                        Design system (off-green glassmorphism)
|
|-- cities/
|   |-- page.tsx                       All Indian Cities browser (filterable grid)
|
|-- city/
|   |-- [citySlug]/
|       |-- page.tsx                   City Hub (overview + AI summary + tabs)
|       |-- food/page.tsx              Food and Cuisine feed
|       |-- culture/page.tsx           Culture and Arts feed
|       |-- language/page.tsx          Language and Dialect deep dive
|       |-- places/page.tsx            Places and Attractions feed
|       |-- festivals/page.tsx         Festivals and Events feed
|       |-- news/page.tsx              Local News and Trending
|
|-- (auth)/
|   |-- login/page.tsx
|   |-- signup/page.tsx
|
|-- api/
    |-- cities/route.ts
    |-- feed/route.ts
    |-- city/[slug]/route.ts
    |-- language/[slug]/route.ts
    |-- bookmarks/route.ts
    |-- sync/city/route.ts             Cron-triggered data sync endpoint
```

### Component Architecture

```
src/components/
|
|-- layout/
|   |-- Navbar.tsx          Glass navbar with India branding + inline city search
|   |-- Footer.tsx          Links, about section, social handles
|   |-- PageWrapper.tsx     Consistent max-width container + padding
|
|-- landing/
|   |-- HeroSection.tsx     Full-screen hero with animated glass search bar
|   |-- FeaturedCities.tsx  Horizontal scroll cards of popular Indian cities
|   |-- CategoryShowcase.tsx Animated preview of all 6 discovery categories
|   |-- StatsBar.tsx        "30+ Cities | 6 Categories | AI-Powered" stats bar
|
|-- city/
|   |-- CityHero.tsx        City banner: name, state, nicknames, AI overview
|   |-- CategoryTabs.tsx    Tab strip: Food | Culture | Language | Places | Festivals | News
|   |-- CitySelector.tsx    Autocomplete search (Indian cities only, with state grouping)
|   |-- CitiesGrid.tsx      Filterable grid with state-region grouping and tier badges
|
|-- discovery/
|   |-- FeedCard.tsx        Universal card for food / place / culture / news items
|   |-- FeedList.tsx        Infinite scroll container with Suspense skeleton fallback
|   |-- AISummaryBanner.tsx GPT-generated city insight callout with source attribution
|   |-- SourceBadge.tsx     Attributed source link (Wikipedia, Zomato, TOI, etc.)
|
|-- language/
|   |-- LanguageCard.tsx    Language stats: name, script, speakers, family, ISO code
|   |-- Phrasebook.tsx      Common phrases with local script + transliteration + audio
|   |-- ScriptDisplay.tsx   Visual rendering of local scripts (Devanagari, Tamil, etc.)
|
|-- food/
|   |-- DishCard.tsx        Dish card: image, region tag, AI summary, veg/non-veg badge
|   |-- RestaurantCard.tsx  Restaurant: rating, neighborhood, cuisine tags, price level
|   |-- FoodTrailMap.tsx    Leaflet map showing food hotspot pins for the city
|
|-- map/
|   |-- CityMap.tsx         Leaflet container (next/dynamic ssr: false)
|   |-- MapMarker.tsx       Custom green pins synced with feed card hover state
|
|-- ui/
    |-- GlassCard.tsx       Reusable off-green glassmorphism card wrapper
    |-- Badge.tsx           Category / state / tier / tag badge component
    |-- Skeleton.tsx        Loading placeholder matching card layouts
    |-- SearchBar.tsx       Reusable glass search input with icon + shortcut hint
    |-- ScrollToTop.tsx     Floating scroll-to-top button (appears after 400px scroll)
```

---

## 5. Backend Architecture

### Request Processing Flow

```
Client Request
     |
     v
Next.js Route Handler
     |
     v
Zod Schema Validation  ---- INVALID ----> 400 Bad Request
     |
   VALID
     |
     v
Upstash Redis Cache Check
     |
     +------ HIT -------> Return cached JSON (with Cache-Control headers)
     |
   MISS
     |
     v
MongoDB Aggregation Query
     |
     v
AI Enrichment (if stale summary detected)
     |
     v
Store result in Redis (TTL: 5-30 min depending on endpoint)
     |
     v
Return JSON response
```

### Data Sync Pipeline (Vercel Cron)

```
Vercel Cron Trigger --> POST /api/sync/city?slug={slug}
                                    |
                    +---------------+---------------+
                    |               |               |
                    v               v               v
             Google Places       NewsAPI        Wikipedia
             (Restaurants +     (Local news    (Culture +
              Attractions)       for city)      Language)
                    |               |               |
                    +---------------+---------------+
                                    |
                             Deduplication
                          (by googlePlaceId / originalUrl)
                                    |
                             Sanitization
                          (strip HTML, validate fields)
                                    |
                          OpenAI GPT-4o-mini
                       (Generate AI summaries per item)
                                    |
                       text-embedding-3-small
                      (Generate 1536-dim vectors)
                                    |
                          MongoDB Atlas Upsert
                       (Update all relevant collections)
```

---

## 6. Database Schema Design

### A. `cities` Collection

```typescript
interface City {
  _id: ObjectId;
  name: string;                     // "Mumbai"
  slug: string;                     // "mumbai" - unique URL key
  state: string;                    // "Maharashtra"
  stateCode: string;                // "MH"
  region: 'north' | 'south' | 'east' | 'west' | 'central' | 'northeast';
  tier: 1 | 2 | 3 | 4;
  location: {
    type: 'Point';
    coordinates: [number, number];  // [longitude, latitude]
  };
  population: number;
  founded: number;                  // Year established
  nicknames: string[];              // ["City of Dreams", "Financial Capital"]
  officialLanguages: string[];      // ["Marathi", "Hindi"]
  otherLanguages: string[];         // ["Gujarati", "English"]
  description: string;
  aiOverview: string;               // GPT-generated 3-sentence city overview
  coverImageUrl: string;
  thumbnailUrl: string;
  tags: string[];                   // ["coastal", "metro", "finance", "bollywood"]
  popularCategories: string[];
  isActive: boolean;
  lastSyncedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Indexes
CitySchema.index({ location: '2dsphere' });
CitySchema.index({ slug: 1 }, { unique: true });
CitySchema.index({ state: 1, tier: 1 });
CitySchema.index({ isActive: 1 });
```

---

### B. `food_items` Collection

```typescript
interface FoodItem {
  _id: ObjectId;
  cityId: ObjectId;                 // ref: City
  citySlug: string;
  name: string;                     // "Vada Pav"
  type: 'dish' | 'street_food' | 'sweet' | 'beverage' | 'snack' | 'full_meal';
  mealType: ('breakfast' | 'lunch' | 'dinner' | 'anytime')[];
  isVegetarian: boolean;
  isVegan: boolean;
  region: string;                   // "Maharashtra"
  description: string;
  aiSummary: string;                // GPT-generated 2-3 sentence summary
  aiSummaryVector: number[];        // 1536-dim embedding vector
  ingredients: string[];
  whereToFind: string[];            // Famous locations to try it
  priceRange: 'budget' | 'mid' | 'premium';
  popularityScore: number;          // 0-100 calculated metric
  photos: string[];
  sourceLinks: { title: string; url: string; sourceName: string }[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Indexes
FoodItemSchema.index({ cityId: 1, popularityScore: -1 });
FoodItemSchema.index({ cityId: 1, type: 1 });
FoodItemSchema.index({ isVegetarian: 1 });
```

---

### C. `restaurants` Collection

```typescript
interface Restaurant {
  _id: ObjectId;
  cityId: ObjectId;
  citySlug: string;
  googlePlaceId: string;            // unique, sparse
  name: string;
  cuisine: string[];                // ["South Indian", "Chettinad"]
  specialDishes: string[];
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  formattedAddress: string;
  neighborhood: string;             // "Bandra West"
  rating: number;                   // 0-5
  userRatingsTotal: number;
  priceLevel: 1 | 2 | 3 | 4;      // 1=budget to 4=very expensive (in INR)
  openingHours: string[];
  aiSummary: string;
  aiSummaryVector: number[];
  popularityScore: number;
  photos: string[];
  sourceLinks: { title: string; url: string; sourceName: string }[];
  isVegetarianOnly: boolean;
  updatedAt: Date;
}

// Indexes
RestaurantSchema.index({ location: '2dsphere' });
RestaurantSchema.index({ cityId: 1, popularityScore: -1 });
RestaurantSchema.index({ googlePlaceId: 1 }, { unique: true, sparse: true });
```

---

### D. `culture_items` Collection

```typescript
interface CultureItem {
  _id: ObjectId;
  cityId: ObjectId;
  citySlug: string;
  name: string;                     // "Bharatanatyam", "Warli Painting"
  type: 'art' | 'dance' | 'music' | 'theatre' | 'craft'
      | 'textile' | 'tradition' | 'architecture';
  era: string;                      // "Ancient", "Medieval", "Colonial", "Modern"
  description: string;
  aiSummary: string;
  aiSummaryVector: number[];
  significance: string;             // Cultural importance / UNESCO status
  whereToExperience: string[];      // Museums, academies, venues
  practitionerCommunity: string;
  isUnescoHeritage: boolean;
  popularityScore: number;
  photos: string[];
  sourceLinks: { title: string; url: string; sourceName: string }[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

---

### E. `languages` Collection

```typescript
interface Language {
  _id: ObjectId;
  cityId: ObjectId;
  citySlug: string;
  name: string;                     // "Tamil"
  nativeName: string;               // "தமிழ்"
  script: string;                   // "Tamil Script"
  isoCode: string;                  // "ta"
  family: string;                   // "Dravidian" | "Indo-Aryan" | "Sino-Tibetan"
  role: 'official' | 'regional' | 'widely_spoken' | 'minority';
  nativeSpeakers: number;
  origin: string;                   // Historical origin description
  aiSummary: string;
  uniqueFeatures: string[];         // Interesting linguistic facts
  commonPhrases: {
    english: string;
    local: string;                  // In native script
    transliteration: string;        // Roman alphabet phonetic
    pronunciation: string;          // Phonetic guide
  }[];
  dialects: string[];
  relatedLanguages: string[];
  isClassicalLanguage: boolean;     // Tamil, Sanskrit, Telugu, Kannada, Malayalam, Odia
  literaryHistory: string;
  sourceLinks: { title: string; url: string; sourceName: string }[];
  updatedAt: Date;
}
```

---

### F. `places` Collection

```typescript
interface Place {
  _id: ObjectId;
  cityId: ObjectId;
  citySlug: string;
  googlePlaceId: string;
  name: string;                     // "Gateway of India"
  type: 'monument' | 'temple' | 'museum' | 'park' | 'market' | 'beach'
      | 'fort' | 'palace' | 'mosque' | 'church' | 'natural'
      | 'hidden_gem' | 'viewpoint' | 'ghat';
  isHiddenGem: boolean;
  isUnescoHeritage: boolean;
  isAsiProtected: boolean;          // Archaeological Survey of India protected
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  formattedAddress: string;
  neighborhood: string;
  entryFee: {
    indian: number;                 // In INR
    foreigner: number;              // In INR
    currency: 'INR';
  };
  openingHours: string[];
  bestTimeToVisit: string;          // "October to February"
  rating: number;
  userRatingsTotal: number;
  description: string;
  aiSummary: string;
  aiSummaryVector: number[];
  historicalPeriod: string;         // "Mughal Era", "British Colonial", "Ancient"
  popularityScore: number;
  photos: string[];
  sourceLinks: { title: string; url: string; sourceName: string }[];
  tags: string[];
  updatedAt: Date;
}

// Indexes
PlaceSchema.index({ location: '2dsphere' });
PlaceSchema.index({ cityId: 1, popularityScore: -1 });
PlaceSchema.index({ cityId: 1, type: 1 });
PlaceSchema.index({ isHiddenGem: 1 });
PlaceSchema.index({ isUnescoHeritage: 1 });
```

---

### G. `festivals` Collection

```typescript
interface Festival {
  _id: ObjectId;
  cityId: ObjectId;
  citySlug: string;
  name: string;                     // "Durga Puja"
  localName: string;                // Name in local language/script
  type: 'religious' | 'cultural' | 'harvest' | 'music' | 'film' | 'folk' | 'civic';
  religion: string | null;          // "Hindu" | "Muslim" | "Sikh" | null (secular)
  month: number;                    // 1-12
  duration: string;                 // "10 days"
  isNationalHoliday: boolean;
  description: string;
  aiSummary: string;
  significance: string;
  howItsCelebrated: string[];       // Key rituals and activities list
  bestPlacesToWitness: string[];    // Specific locations/pandals/venues
  popularityScore: number;
  photos: string[];
  sourceLinks: { title: string; url: string; sourceName: string }[];
  tags: string[];
  updatedAt: Date;
}
```

---

### H. `news_events` Collection

```typescript
interface NewsEvent {
  _id: ObjectId;
  cityId: ObjectId;
  citySlug: string;
  title: string;
  summary: string;
  aiSummary: string;
  originalUrl: string;              // unique
  sourceName: string;               // "Times of India" | "The Hindu" | "NDTV"
  publishedAt: Date;
  imageUrl: string;
  category: 'civic' | 'culture' | 'sports' | 'politics'
           | 'business' | 'development' | 'community';
  tags: string[];
  popularityScore: number;
  expiresAt: Date;                  // TTL - auto-delete after 7 days
  updatedAt: Date;
}

// Indexes
NewsEventsSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index
NewsEventsSchema.index({ cityId: 1, publishedAt: -1 });
NewsEventsSchema.index({ originalUrl: 1 }, { unique: true });
```

---

### I. `users` Collection

```typescript
interface User {
  _id: ObjectId;
  email: string;                    // unique
  name: string;
  image: string;
  preferredLanguage: string;        // "en" | "hi" | "ta" | "bn" | "te" | "mr"
  homeCity: string | null;          // Slug of user's home city
  preferredCategories: ('food' | 'culture' | 'language' | 'places' | 'festivals' | 'news')[];
  savedCities: ObjectId[];
  bookmarks: {
    itemId: ObjectId;
    itemType: 'food' | 'restaurant' | 'place' | 'culture' | 'festival' | 'news';
    savedAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
```

---

### J. `states` Collection

```typescript
interface State {
  _id: ObjectId;
  name: string;                     // "Madhya Pradesh"
  slug: string;                     // "madhya-pradesh"
  stateCode: string;                // "MP"
  region: 'north' | 'south' | 'east' | 'west' | 'central' | 'northeast';
  type: 'State' | 'Union Territory';
  capital: string;                  // "Bhopal"
  totalCities: number;              // 107
  scrapedCitiesCount: number;       // Number of cities ingested
  cities: string[];                 // ["Bhopal", "Indore", "Gwalior", ...]
  cityDetails: {
    name: string;
    slug: string;
    tier: 1 | 2 | 3 | 4;
    isScraped: boolean;
  }[];
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Indexes
StateSchema.index({ slug: 1 }, { unique: true });
StateSchema.index({ region: 1, type: 1 });
StateSchema.index({ stateCode: 1 });
```

---

## 7. AI and Data Pipeline

### Summarization Prompt Templates

**City Overview:**
```
System: You are a knowledgeable Indian travel and culture writer. Write factual,
        engaging content ONLY based on the provided context. Do NOT invent facts,
        statistics, or claims not present in the source material.

User:   Generate a 3-sentence overview of {cityName}, {stateName}, India.
        Context: {wikipedia_extract}
        Focus on: cultural identity, what makes it unique, why someone should visit.
```

**Food Item:**
```
System: You are a food critic specializing in Indian regional cuisine. Write only
        from provided source context. No invented claims about prices or locations.

User:   Summarize the dish "{dishName}" from {cityName} in 2 engaging sentences.
        Context: {source_text}
        Include: taste profile, cultural significance, and where to find it.
```

**Language Profile:**
```
System: You are a linguistics expert on Indian languages and dialects. Use only
        factual data from the provided context.

User:   Describe the language "{languageName}" spoken in {cityName} in 3 sentences.
        Context: {wikidata_extract}
        Cover: language family/script, speaker count, and one unique linguistic feature.
```

**Festival Description:**
```
System: You are an expert on Indian festivals and cultural traditions. Write only
        from verified source context. No invented rituals or dates.

User:   Describe "{festivalName}" celebrated in {cityName} in 2-3 sentences.
        Context: {source_text}
        Cover: significance, how it is celebrated, and best way to experience it.
```

### Vector Search Configuration

| Property | Value |
|----------|-------|
| Model | `text-embedding-3-small` |
| Dimensions | 1536 |
| Index Type | MongoDB Atlas Vector Search |
| Field Name | `aiSummaryVector` (on all content collections) |
| Distance Metric | cosine |
| Use Cases | "Dishes similar to Biryani", "Art forms like Kathakali" |

### Cron Sync Schedule

| Job Name | Cron Schedule | Target Collections | Scope |
|----------|---------------|--------------------|-------|
| `sync-news` | Every 6 hours | `news_events` | All active cities |
| `sync-places-tier1` | Every 24 hours | `places`, `restaurants` | Tier 1 Metro cities |
| `sync-places-tier2` | Every 72 hours | `places`, `restaurants` | Tier 2 and 3 cities |
| `generate-overviews` | Every Sunday | `cities` | Cities with stale AI summaries |
| `recompute-scores` | Every midnight | All content collections | Popularity score recalc |

---

## 8. API Endpoints Specification

### Public Endpoints

| Method | Endpoint | Query Params | Description |
|--------|----------|-------------|-------------|
| `GET` | `/api/v1/cities` | `region`, `tier`, `state` | List all active Indian cities |
| `GET` | `/api/v1/cities/search` | `q` (required) | City autocomplete (Indian only) |
| `GET` | `/api/v1/cities/:slug` | - | City metadata + AI overview |
| `GET` | `/api/v1/cities/:slug/food` | `type`, `page`, `limit` | Food items + restaurants |
| `GET` | `/api/v1/cities/:slug/culture` | `type`, `page`, `limit` | Culture and arts items |
| `GET` | `/api/v1/cities/:slug/language` | - | Language profile + phrasebook |
| `GET` | `/api/v1/cities/:slug/places` | `type`, `hiddenGems`, `page` | Places and attractions |
| `GET` | `/api/v1/cities/:slug/festivals` | `month`, `type`, `page` | Festivals and events |
| `GET` | `/api/v1/cities/:slug/news` | `category`, `page`, `limit` | Latest local news |
| `GET` | `/api/v1/cities/:slug/feed` | `category`, `page`, `limit` | Combined paginated feed |
| `GET` | `/api/v1/places/nearby` | `lat`, `lng`, `radius`, `type` | Geo-spatial nearby POI |
| `GET` | `/api/v1/search` | `q`, `type`, `city` | Cross-category semantic search |

### Authenticated Endpoints

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| `POST` | `/api/v1/bookmarks` | `{ itemType, itemId }` | Save a bookmark |
| `DELETE` | `/api/v1/bookmarks/:id` | - | Remove a bookmark |
| `GET` | `/api/v1/bookmarks` | - | Get user bookmarks |
| `PATCH` | `/api/v1/users/me` | partial User object | Update user preferences |

### Internal / Cron Endpoints (Bearer Token Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/sync/city` | `?slug=` Full city data sync |
| `POST` | `/api/sync/news` | `?slug=` News-only sync |
| `POST` | `/api/sync/overviews` | Regenerate all stale AI overviews |

---

## 9. Indian Cities and Categories Coverage

### State-wise City Highlights

```
NORTH INDIA
   Delhi (NCT)        Street food, Mughal monuments, mix of 22 languages, Diwali
   Agra (UP)          Taj Mahal, Mughal heritage, Petha sweets, Braj Holi
   Varanasi (UP)      Ganga ghats, Kashi Vishwanath, Banarasi silk, Dev Deepawali
   Lucknow (UP)       Nawabi tehzeeb, Tunday Kababi, Chikankari craft, Dastangoi
   Amritsar (PB)      Golden Temple, Jallianwala Bagh, Makki di Roti, Bhangra
   Jaipur (RJ)        Pink City, Amber Fort, Blue Pottery, Gangaur festival
   Jodhpur (RJ)       Blue City, Mehrangarh Fort, Dal Baati Churma, Marwar Festival
   Udaipur (RJ)       Lake Pichola, City Palace, Mewar painting, Shilpgram Festival

WEST INDIA
   Mumbai (MH)        Bollywood, Vada Pav, Dabbawalas, Ganesh Chaturthi
   Pune (MH)          Maratha forts, Misal Pav, Lavani dance, Sawai Gandharva
   Ahmedabad (GJ)     UNESCO Old City, Garba, Gujarati thali, Uttarayan kite festival
   Surat (GJ)         Diamond trade, Surti Undhiyu, Embroidery, Dang Darbar

SOUTH INDIA
   Bengaluru (KA)     IT capital, Filter coffee, Yakshagana, Kadlekai Parishe
   Chennai (TN)       Carnatic music, Bharatanatyam, Chettinad cuisine, Pongal
   Hyderabad (TS)     Hyderabadi Biryani, Charminar, Perini dance, Bonalu festival
   Mysuru (KA)        Mysore Palace, Mysore Pak, Dasara procession, Silk weaving
   Madurai (TN)       Meenakshi Temple, Thiruvalluvar, Jigarthanda, Chithirai festival
   Kochi (KL)         Kathakali, Kerala sadya, Chinese fishing nets, Onam boat races

EAST INDIA
   Kolkata (WB)       Durga Puja, Rabindra Sangeet, Mishti Doi, Jatra theatre
   Puri (OD)          Jagannath Temple, Rath Yatra, Odissi dance, Mahaprasad
   Bhubaneswar (OD)   Temple City, Pattachitra art, Dhokra craft, Ekamra Utsav
   Guwahati (AS)      Kamakhya Temple, Bihu dance, Assam tea, Ambubachi Mela

CENTRAL INDIA
   Bhopal (MP)        Nawabi architecture, Poha-Jalebi, Bhimbetka caves, Lokrang
   Indore (MP)        Sarafa night bazaar, Poha capital, Holkar era forts, Annapurna fair
   Nagpur (MH)        Orange orchards, Saoji cuisine, Ambazari lake, Diwali fairs

NORTHEAST INDIA
   Shillong (ML)      Living root bridges, Khasi culture, Welsh chapel music, Nongkrem dance
   Gangtok (SK)       Rumtek monastery, Momos, Losar festival, Kangchenjunga views
   Imphal (MN)        Loktak Lake, Manipuri classical dance, Eromba dish, Sangai festival
```

---

## 10. State Management and Data Flow

```
User Action (select city / switch category tab / apply filter)
                   |
                   v
          +-----------------+
          |  Zustand Store  |  <-- activeCity, activeCategory,
          +-------+---------+      activeFilters, mapState, sidebarOpen
                  |
                  | triggers query key change
                  v
          +-----------------------------------+
          |       TanStack Query v5           |
          |  queryKey: [slug, category, page] |
          |  staleTime: 5 minutes             |
          |  gcTime: 10 minutes               |
          |  refetchOnWindowFocus: false       |
          +----------+------------------------+
                     |
           Cache HIT |  Cache MISS
                     +-----------> GET /api/v1/cities/{slug}/{category}
                     |                         |
                     |                         v
                     |                MongoDB Aggregation
                     |           (popularity sorted + paginated)
                     |                         |
                     <-------------------------+
                        Stale-While-Revalidate
                                |
                                v
                      Render Feed Cards
                      (React Suspense + Skeleton)
                      (Infinite Scroll via IntersectionObserver)
```

---

## 11. Performance and Rendering Strategy

| Page | Rendering Strategy | Revalidation Period |
|------|--------------------|---------------------|
| Landing `/` | SSG | On every deploy |
| All Cities `/cities` | ISR | 24 hours |
| City Hub `/city/[slug]` | ISR | 1 hour |
| Food Feed `/city/[slug]/food` | SSR + TanStack Query | Real-time |
| Language `/city/[slug]/language` | ISR | 7 days |
| Culture `/city/[slug]/culture` | ISR | 24 hours |
| News `/city/[slug]/news` | SSR | Real-time |
| Festivals `/city/[slug]/festivals` | ISR | 12 hours |
| Places `/city/[slug]/places` | SSR + TanStack Query | Real-time |

### Key Optimization Techniques

| Technique | Implementation |
|-----------|---------------|
| Leaflet SSR avoidance | `next/dynamic({ ssr: false })` |
| Image optimization | Next.js `<Image />` with Cloudinary CDN |
| Font loading | `next/font/google` - zero FOUT |
| Loading states | React Suspense + matching Skeleton components |
| Code splitting | Automatic per-route with Next.js App Router |
| Hover prefetch | `router.prefetch()` on city card mouse enter |
| Scroll restore | Next.js built-in scroll restoration |

---

## 12. Security, Rate Limiting and Guardrails

### Upstash Redis Sliding Window Rate Limits

| Endpoint Category | Max Requests | Window |
|-------------------|-------------|--------|
| Public API | 60 req | Per minute per IP |
| Search endpoint | 20 req | Per minute per IP |
| Authenticated users | 200 req | Per minute per user |
| Sync / Cron routes | Internal only | Bearer token required |

### AI Anti-Hallucination Guardrails

- All prompts enforce **strict RAG grounding** - model instructed not to invent facts
- Source Wikipedia/Wikidata context always injected before AI call
- Outputs validated: minimum 50 chars, maximum 600 chars per summary
- Regex checks: flag outputs containing "I don't know", "I cannot", or invented statistics
- Suspicious outputs quarantined for manual editorial review before publish

### Input Validation (Zod Schemas)

| Validation | Rule |
|-----------|------|
| City slug | `/^[a-z0-9-]+$/` - lowercase alphanumeric + hyphens only |
| Geo lat | Range: -90 to 90 |
| Geo lng | Range: -180 to 180 |
| Pagination limit | Max 50 results per page (enforced server-side) |
| Search query | Max 100 characters, stripped of SQL/NoSQL injection patterns |
| City scope | All city slugs validated against allowlist of Indian city slugs |

---

## 13. Project Directory Structure

```
AI-Powered_City_Discovery_Platform/
|-- ARCHITECTURE.md                  <-- This file (India-scoped, full spec)
|-- frontend-architecture.md         <-- Legacy frontend reference
|-- backend-architecture.md          <-- Legacy backend reference
|
+-- frontend/                        <-- Next.js 14 Application Root
    |-- next.config.ts
    |-- tsconfig.json
    |-- package.json
    |-- .env.local                   <-- All environment variables (gitignored)
    |
    +-- src/
        |
        +-- app/                     <-- Next.js App Router
        |   |-- globals.css          Off-green glassmorphism design system
        |   |-- layout.tsx           Root layout + TanStack Provider + fonts
        |   |-- page.tsx             Landing page
        |   |-- cities/page.tsx      All Indian cities browser
        |   |-- city/
        |   |   +-- [citySlug]/
        |   |       |-- page.tsx
        |   |       |-- food/page.tsx
        |   |       |-- culture/page.tsx
        |   |       |-- language/page.tsx
        |   |       |-- places/page.tsx
        |   |       |-- festivals/page.tsx
        |   |       +-- news/page.tsx
        |   |-- (auth)/
        |   |   |-- login/page.tsx
        |   |   +-- signup/page.tsx
        |   +-- api/
        |       |-- cities/route.ts
        |       |-- feed/route.ts
        |       |-- city/[slug]/route.ts
        |       |-- language/[slug]/route.ts
        |       |-- bookmarks/route.ts
        |       +-- sync/city/route.ts
        |
        +-- components/
        |   |-- layout/     Navbar, Footer, PageWrapper
        |   |-- landing/    HeroSection, FeaturedCities, CategoryShowcase, StatsBar
        |   |-- city/       CityHero, CategoryTabs, CitySelector, CitiesGrid
        |   |-- discovery/  FeedCard, FeedList, AISummaryBanner, SourceBadge
        |   |-- language/   LanguageCard, Phrasebook, ScriptDisplay
        |   |-- food/       DishCard, RestaurantCard, FoodTrailMap
        |   |-- map/        CityMap, MapMarker
        |   +-- ui/         GlassCard, Badge, Skeleton, SearchBar, ScrollToTop
        |
        +-- hooks/
        |   |-- useCityFeed.ts
        |   |-- useCitySearch.ts
        |   |-- useBookmarks.ts
        |   +-- useDebounce.ts
        |
        +-- store/
        |   |-- useFilterStore.ts
        |   +-- useMapStore.ts
        |
        +-- lib/
        |   |-- mongodb.ts           MongoDB connection singleton (cached)
        |   |-- redis.ts             Upstash Redis client
        |   |-- openai.ts            OpenAI client with retry config
        |   +-- validations.ts       All Zod schemas
        |
        +-- models/
        |   |-- City.ts
        |   |-- FoodItem.ts
        |   |-- Restaurant.ts
        |   |-- CultureItem.ts
        |   |-- Language.ts
        |   |-- Place.ts
        |   |-- Festival.ts
        |   |-- NewsEvent.ts
        |   +-- User.ts
        |
        +-- data/
        |   |-- cities.ts            30 Indian cities seed data with coordinates
        |   |-- food.ts              Mock food items per city
        |   |-- culture.ts           Mock culture items per city
        |   |-- language.ts          Mock language profiles with phrasebooks
        |   +-- places.ts            Mock places and attractions per city
        |
        +-- types/
        |   |-- city.ts
        |   |-- feed.ts
        |   +-- api.ts
        |
        +-- utils/
            |-- api-client.ts        Fetch wrapper with retry + error handling
            |-- formatters.ts        Date, INR price, distance formatters
            +-- geo.ts               Haversine distance + India bounding box helpers
```

---

## 14. Deployment Architecture

```
+--------------------------------------------+
|           Vercel Edge Network               |
|    Next.js App + Serverless Functions       |
|    Primary Region: Mumbai (ap-south-1)      |
+-------------------+------------------------+
                    |
        +-----------+-----------+
        |           |           |
        v           v           v
+-----------+ +-----------+ +-----------+
| MongoDB   | |  Upstash  | | Cloudinary|
| Atlas M10 | |  Redis    | | Image CDN |
| Mumbai    | | Global    | | Indian    |
| Cluster   | | Replicas  | | Photos    |
+-----------+ +-----------+ +-----------+
```

### Environment Variables Required

```env
# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/india_city_discovery

# AI
OPENAI_API_KEY=sk-...

# Cache and Rate Limiting
UPSTASH_REDIS_REST_URL=https://...upstash.io
UPSTASH_REDIS_REST_TOKEN=...

# External Data APIs
GOOGLE_PLACES_API_KEY=...
NEWSAPI_KEY=...
TAVILY_API_KEY=...

# Authentication
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://yourapp.vercel.app

# Media
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# Internal Security
CRON_SECRET=...                    # Bearer token for cron endpoint auth
```

---

## 15. Development Roadmap

### Phase 1 - Foundation (Current)
- [x] Architecture documentation (India-scoped)
- [x] Next.js 14 project scaffolding
- [x] Off-green glassmorphism design system (`globals.css`)
- [ ] Landing page with animated hero + city search bar
- [ ] Featured Indian cities grid with mock data (30 cities)
- [ ] Mock seed data for all 6 categories

### Phase 2 - Core Pages
- [ ] City hub page with AI overview banner
- [ ] Category tabs: Food / Culture / Language / Places / Festivals / News
- [ ] FeedCard components with rich mock data
- [ ] Language phrasebook with script display (Devanagari, Tamil, Bengali, etc.)
- [ ] Interactive Leaflet map with city POI pins

### Phase 3 - Data and AI Integration
- [ ] MongoDB Atlas M10 cluster setup (Mumbai region)
- [ ] Mongoose models for all 9 collections with proper indexes
- [ ] All BFF API route handlers with Zod validation
- [ ] OpenAI summarization pipeline with anti-hallucination guardrails
- [ ] Google Places API integration (geo-fenced to India)
- [ ] NewsAPI integration (Indian sources: TOI, The Hindu, NDTV, Indian Express)

### Phase 4 - User Features
- [ ] Auth.js with Google OAuth (Indian email support)
- [ ] Bookmarks system (save cities, food items, places, festivals)
- [ ] User preference profile (home city, category preferences, UI language)
- [ ] "My City" personalized home feed with bookmark-based recommendations

### Phase 5 - Polish and Launch
- [ ] ISR caching per page type (see rendering strategy table)
- [ ] Vercel Cron jobs for automated data sync pipeline
- [ ] Sentry error monitoring with Slack alerts
- [ ] SEO: city-specific meta tags, OG images, JSON-LD structured data
- [ ] Lighthouse performance audit - target score 90+ on all Core Web Vitals
- [ ] Accessibility audit (WCAG 2.1 AA compliance)

---

> **Scope Note:** This platform covers **India only**. All city data, food items,
> cultural content, language profiles, festival information, and news feeds are
> sourced and scoped exclusively to Indian cities and their states.
> International cities are out of scope by design.

---
*Architecture Document - AI-Powered India City Discovery Platform*
*Last Updated: October 2026*
