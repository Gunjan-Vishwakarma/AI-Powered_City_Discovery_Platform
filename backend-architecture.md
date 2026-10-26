# Backend Architecture Specification: AI-Powered City Discovery Platform

## 1. Architectural Overview & Technology Stack

The backend architecture for the **AI-Powered City Discovery Platform** is designed as a scalable **Backend-for-Frontend (BFF)** service hosted via Next.js Route Handlers / Node.js runtime, supported by a managed **MongoDB Atlas** database cluster, external location/search APIs, and an **OpenAI RAG processing pipeline**.

```
+-----------------------------------------------------------------------------------+
|                                 Next.js API Layer                                 |
|                                                                                   |
|  +------------------+     +-----------------------+     +----------------------+  |
|  | /api/v1/cities   |     | /api/v1/feed          |     | /api/v1/sync/city    |  |
|  | (City Directory) |     | (Aggregation Engine)  |     | (Background Pipeline)|  |
|  +--------+---------+     +-----------+-----------+     +-----------+----------+  |
+-----------|---------------------------|-----------------------------|-------------+
            |                           |                             |
            v                           v                             v
+-----------------------+   +-----------------------+     +-------------------------+
|   MongoDB Atlas DB    |   | Redis Caching Layer   |     |  External Services      |
|  - Geo 2dsphere Index |   | - Feed Response Cache |     |  - Google Places API    |
|  - Vector Search Index|   | - Sliding Rate Limits |     |  - NewsAPI / Tavily     |
|  - TTL News Auto-Clean|   +-----------------------+     |  - OpenAI API (GPT-4o)  |
+-----------------------+                                 +-------------------------+
```

### Core Stack Components:
* **Runtime & API Layer:** Node.js (Next.js App Router Route Handlers / Edge Serverless Functions)
* **Database:** MongoDB Atlas (Cloud Database with native `2dsphere` spatial indexing, document schemas, and Atlas Vector Search)
* **Object Data Modeling (ODM):** Mongoose 8.x / MongoDB Native Driver for Node.js
* **AI & Embeddings Engine:** OpenAI API (`gpt-4o-mini` for batch summaries, `text-embedding-3-small` for vector search)
* **External API Integration Layer:**
  * **Location & POI Data:** Google Places API (New), OpenTripMap API, Wikipedia / Wikidata
  * **News & Trending Content:** NewsAPI, Tavily AI Search / Exa AI
* **Caching & Rate Limiting:** Upstash Redis (Sliding window rate-limiting & response caching)
* **Auth & Security:** Auth.js (NextAuth) or Clerk with MongoDB adapter, JWT tokens

---

## 2. MongoDB Database Schema Design

MongoDB's flexible BSON document model is ideally suited for storing heterogeneous multi-source travel data, AI-generated summaries, geospatial coordinates, and expiring news feeds.

### A. `cities` Collection
Stores metadata for cities supported by the platform.
```typescript
// Mongoose Schema Definition
import { Schema, model } from 'mongoose';

const CitySchema = new Schema({
  name: { type: String, required: true, index: true },
  country: { type: String, required: true },
  countryCode: { type: String, required: true },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  },
  description: { type: String },
  popularCategories: [{ type: String }],
  isActive: { type: Boolean, default: true, index: true },
  lastSyncedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Geospatial Index
CitySchema.index({ location: '2dsphere' });
```

### B. `places` Collection (Food & Attractions)
Aggregates POI data from Google Places, OpenTripMap, and Wikipedia.
```typescript
const PlaceSchema = new Schema({
  cityId: { type: Schema.Types.ObjectId, ref: 'City', required: true, index: true },
  googlePlaceId: { type: String, unique: true, sparse: true },
  name: { type: String, required: true },
  category: { type: String, enum: ['food', 'places'], required: true, index: true },
  subCategories: [{ type: String, index: true }], // e.g., ['ramen', 'restaurant', 'michelin']
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  },
  formattedAddress: { type: String },
  rating: { type: Number, default: 0 },
  userRatingsTotal: { type: Number, default: 0 },
  popularityScore: { type: Number, default: 0, index: -1 }, // 0 - 100 calculated metric
  aiSummary: { type: String, required: true },
  aiSummaryVector: [{ type: Number }], // Embeddings for Vector Search
  sourceLinks: [{
    title: { type: String, required: true },
    url: { type: String, required: true },
    sourceName: { type: String, required: true }
  }],
  photos: [{ type: String }],
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Indexes
PlaceSchema.index({ location: '2dsphere' });
PlaceSchema.index({ cityId: 1, category: 1, popularityScore: -1 });
```

### C. `news_events` Collection
Holds periodically refreshed local news stories, trending articles, and upcoming events.
```typescript
const NewsEventsSchema = new Schema({
  cityId: { type: Schema.Types.ObjectId, ref: 'City', required: true, index: true },
  title: { type: String, required: true },
  category: { type: String, enum: ['news_events'], default: 'news_events', index: true },
  publishedAt: { type: Date, required: true, index: -1 },
  aiSummary: { type: String, required: true },
  originalUrl: { type: String, required: true, unique: true },
  sourceName: { type: String, required: true },
  imageUrl: { type: String },
  tags: [{ type: String }],
  popularityScore: { type: Number, default: 50 },
  expiresAt: { type: Date, required: true } // TTL field
}, { timestamps: true });

// TTL Index for automated document cleanup after expiration
NewsEventsSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
NewsEventsSchema.index({ cityId: 1, category: 1, publishedAt: -1 });
```

### D. `users` Collection
Stores user profile information, category interests, and saved bookmarks.
```typescript
const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  image: { type: String },
  preferredCategories: [{ type: String, enum: ['places', 'food', 'news_events'] }],
  savedCities: [{ type: Schema.Types.ObjectId, ref: 'City' }],
  bookmarkedPlaceIds: [{ type: Schema.Types.ObjectId, ref: 'Place' }],
  bookmarkedNewsIds: [{ type: Schema.Types.ObjectId, ref: 'NewsEvents' }]
}, { timestamps: true });
```

---

## 3. Data Sync, Retrieval & AI Pipeline

```
+---------------------------------------------------------------------------------+
|                        Background Ingestion & AI Pipeline                       |
|                                                                                 |
| 1. External Ingestion       2. Deduplication          3. AI Summarization & RAG |
| +-------------------+       +-------------------+       +---------------------+ |
| | Google Places API | ----> | Check Existing ID | ----> | OpenAI GPT-4o-mini  | |
| | NewsAPI / Tavily  |       | or Canonical URL  |       | Summarize & Ground  | |
| +-------------------+       +-------------------+       +----------+----------+ |
|                                                                    |            |
| 4. Vector Embedding                                                v            |
| +-------------------------+                             5. MongoDB Atlas Upsert |
| | text-embedding-3-small  | --------------------------> +---------------------+ |
| +-------------------------+                             | Places / News Collections|
|                                                         +---------------------+ |
+---------------------------------------------------------------------------------+
```

### Pipeline Workflow Steps:
1. **Cron Job Trigger (`/api/v1/sync/city`):** Triggered scheduled cron job (e.g., Vercel Cron or GitHub Action) requests fresh location and news data for active cities.
2. **Multi-Source Fetching:**
   * Query Google Places API for trending restaurants (`catering`) and top sights (`tourism`).
   * Query NewsAPI / Tavily for recent city news and upcoming local cultural events.
3. **Sanitization & Deduplication:** Filter out duplicates based on `googlePlaceId` or article `originalUrl`.
4. **AI Summarization & Grounding (RAG):**
   * Raw text payloads are formatted and passed to OpenAI (`gpt-4o-mini`).
   * System prompt enforces strict grounding: *"Summarize the provided place or news item in 2 concise, engaging sentences. Do NOT invent opening hours, addresses, or prices not in the source text."*
5. **MongoDB Upsert:** Write clean records into MongoDB Atlas with updated `popularityScore` and updated `sourceLinks`.

---

## 4. API Endpoints Specification

### A. Discovery Feed Aggregation
* **Endpoint:** `GET /api/v1/feed`
* **Query Parameters:**
  * `citySlug` (string, required): e.g., `tokyo`
  * `category` (string, optional): `all` | `places` | `food` | `news_events`
  * `page` (number, optional, default: 1)
  * `limit` (number, optional, default: 20)
* **MongoDB Aggregation Pipeline Execution:**
  ```javascript
  const pipeline = [
    { $match: { cityId: city._id, ...(category !== 'all' && { category }) } },
    { $sort: { popularityScore: -1, updatedAt: -1 } },
    { $skip: (page - 1) * limit },
    { $limit: limit },
    {
      $project: {
        _id: 1,
        name: 1,
        title: 1,
        category: 1,
        subCategories: 1,
        location: 1,
        rating: 1,
        popularityScore: 1,
        aiSummary: 1,
        sourceLinks: 1,
        photos: 1,
        imageUrl: 1,
        publishedAt: 1
      }
    }
  ];
  ```

### B. Spatial Nearby POI Search
* **Endpoint:** `GET /api/v1/places/nearby`
* **Query Parameters:** `lng`, `lat`, `radiusMeters` (default: 5000), `category`
* **MongoDB Query:** Uses `$nearSphere` or `$geoWithin` with `2dsphere` index.

### C. City Directory Listing
* **Endpoint:** `GET /api/v1/cities`
* **Returns:** List of active supported cities with geographic coordinates and basic stats.

### D. User Bookmarks
* **Endpoint:** `POST /api/v1/bookmarks`
* **Payload:** `{ itemType: 'place' | 'news', itemId: string }`
* **Auth:** Requires JWT Auth session token.

---

## 5. Security, Rate Limiting & Operational Guardrails

* **Rate Limiting:** Upstash Redis sliding window limiter enforcing a max of 60 requests/minute per IP for public endpoints, and 200 requests/minute for authenticated users.
* **Anti-Hallucination Guardrails:** AI prompts use explicit RAG context constraints to ensure summaries only reflect retrieved API facts.
* **Cost Management:** Third-party API responses are cached in MongoDB for 24–72 hours to prevent unnecessary Google Places and Tavily credit consumption.
* **Geospatial & Input Validation:** Zod schemas validate all incoming API parameters (`lat`/`lng` bounds, string lengths) prior to executing MongoDB queries.

---
*Created for the AI-Powered City Discovery Platform Project.*
