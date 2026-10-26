# Frontend Architecture Specification: AI-Powered City Discovery Platform

## 1. Architectural Overview & Technology Stack

The **AI-Powered City Discovery Platform** frontend is designed as a high-performance, responsive Single Page Application (SPA) with Server-Side Rendering (SSR) capabilities built on **Next.js 14+ (App Router)**. It provides a fluid, feed-based experience for users discovering local food, attractions, news, and hidden gems across global cities.

```
+-----------------------------------------------------------------------+
|                            Next.js Frontend                           |
|                                                                       |
|  +---------------------+  +--------------------+  +----------------+  |
|  | Server Components   |  | Client Components  |  | State (Zustand)|  |
|  | (SEO, SSR Feed)     |  | (Filters, Map View)|  | (UI & Filters) |  |
|  +----------+----------+  +---------+----------+  +-------+--------+  |
|             |                       |                     |           |
|             v                       v                     v           |
|  +-----------------------------------------------------------------+  |
|  |             TanStack Query v5 (Data Fetching & Cache)            |  |
|  +----------------------------------+------------------------------+  |
+-------------------------------------|---------------------------------+
                                      v
                        Next.js API Routes / Backend
```

### Core Stack Components:
* **Framework:** Next.js 14+ (App Router with React 18 & Server Components)
* **Language:** TypeScript 5.x (Strict type safety across API contracts and UI props)
* **Styling & UI:** Tailwind CSS, Shadcn UI / Radix UI primitives, Lucide React icons
* **State Management:**
  * **Server State:** TanStack Query v5 (React Query) for API caching, deduplication, and optimistic updates
  * **Client UI State:** Zustand (lightweight store for category selections, map toggles, and active modal views)
* **Map & Location Rendering:** Leaflet.js with React-Leaflet (or Mapbox GL React) for interactive spatial pin rendering
* **Http Client:** Axios / Fetch API wrapper with automatic error retry and timeout handling

---

## 2. Project Directory Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx            # Login view
│   │   └── signup/
│   │       └── page.tsx            # User registration
│   ├── (discovery)/
│   │   ├── cities/
│   │   │   └── page.tsx            # City directory/selection page
│   │   └── city/
│   │       └── [citySlug]/
│   │           ├── page.tsx        # Main City Feed View (All Categories)
│   │           ├── food/
│   │           │   └── page.tsx    # Filtered Food Feed
│   │           ├── places/
│   │           │   └── page.tsx    # Filtered POI & Attractions Feed
│   │           └── news/
│   │               └── page.tsx    # Filtered News & Events Feed
│   ├── api/                        # Next.js Route Handlers (BFF layer)
│   │   ├── feed/route.ts
│   │   ├── cities/route.ts
│   │   └── bookmarks/route.ts
│   ├── layout.tsx                  # Root layout with providers & navbar
│   ├── page.tsx                    # Landing Page / Hero City Search
│   └── globals.css                 # Tailwind CSS styles
├── components/
│   ├── ui/                         # Shadcn UI base components (Button, Card, Dialog)
│   ├── layout/
│   │   ├── Navbar.tsx              # Main navigation header
│   │   └── Footer.tsx              # Footer with links
│   ├── discovery/
│   │   ├── CityHero.tsx            # Selected city header with AI summary overview
│   │   ├── CategoryTabs.tsx        # Places, Food, News/Events toggle tabs
│   │   ├── FeedCard.tsx            # Multi-category item card with source citations
│   │   ├── FeedList.tsx            # Infinite scrolling feed container
│   │   ├── AISummaryBanner.tsx     # Highlighted AI insights box
│   │   └── SourceBadge.tsx         # Attributed source link component
│   ├── map/
│   │   ├── CityMap.tsx             # Interactive map container
│   │   └── MapMarker.tsx           # Custom pin markers sync'd with hover state
│   └── city/
│       ├── CitySelector.tsx        # Autocomplete search component for city selection
│       └── PopularCitiesGrid.tsx  # Landing page city grid
├── hooks/
│   ├── useCityFeed.ts              # TanStack query hook for paginated feed
│   ├── useCitySearch.ts            # Hook for city autocomplete
│   ├── useBookmarks.ts             # Hook for user saved places
│   └── useDebounce.ts              # Input debouncing hook
├── store/
│   ├── useFilterStore.ts           # Active category and search filters state
│   └── useMapStore.ts              # Map position, zoom level, and selected pin state
├── types/
│   ├── city.ts                     # TypeScript interfaces for City model
│   ├── feed.ts                     # TypeScript interfaces for Feed Item, Place, News
│   └── api.ts                      # API response & query payload contracts
└── utils/
    ├── api-client.ts               # Fetch instance with error handling
    ├── formatters.ts               # Date, distance, and score formatters
    └── geo.ts                      # Haversine distance & map bound helpers
```

---

## 3. Key Pages & Component Specifications

### A. Landing Page (`/app/page.tsx`)
* **Hero Search Banner:** Prominent city search autocomplete bar with instant fuzzy matching.
* **Featured Cities Grid:** Displays popular supported cities with visual card thumbnails and current activity counts.
* **Category Preview Section:** Highlights sample categories (*Places*, *Local Food*, *Trending News*).

### B. City Discovery Page (`/app/(discovery)/city/[citySlug]/page.tsx`)
* **City Header & AI Overview Banner:** Dynamic summary card displaying an AI-generated synthesis of what's currently popular or happening in the selected city.
* **Category Filtering Navigation (`CategoryTabs.tsx`):**
  * `All` (Combined chronological & popularity feed)
  * `Places` (Attractions, parks, landmarks, hidden gems)
  * `Food` (Restaurants, local dishes, popular dining)
  * `News & Events` (Trending local stories, cultural events, festivals)
* **Discovery Feed (`FeedList.tsx` & `FeedCard.tsx`):**
  * Card components rendering dynamic badges, location metrics, rating, `popularityScore` (0–100), AI bullet summary, and direct external source badges (e.g., *Google Places*, *Tavily*, *NewsAPI*).
* **Split/Toggle Map View (`CityMap.tsx`):**
  * Synchronized spatial map view showing pins for all POIs on the current page. Hovering over a feed card highlights the corresponding pin on the map.

---

## 4. State Management & Data Flow Architecture

```
+------------------+         Dispatch Action        +-------------------+
| User Filter Tab  | -----------------------------> |  useFilterStore   |
| (e.g., 'food')   |                                |  (Zustand)        |
+------------------+                                +---------+---------+
                                                              |
                                                              v Triggers Query Key Change
+------------------+     Fetch Next Page           +-------------------+
|  Feed UI View    | <---------------------------- |   useCityFeed     |
|  (React Server/  |  Render Stale-While-Revalidate| (TanStack Query)  |
|   Client Components)                             +---------+---------+
+------------------+                                          |
                                                              v HTTP GET
                                                   +-------------------+
                                                   | /api/v1/feed Route|
                                                   +-------------------+
```

1. **Category Selection:** When the user switches categories or alters filters, Zustand updates `activeCategory`.
2. **Query Hydration:** `useCityFeed` consumes `activeCategory` as part of its TanStack Query key (`['cityFeed', citySlug, activeCategory]`).
3. **Data Caching:** Client checks cache before initiating an HTTP request. Responses are cached with a `staleTime` of 5 minutes to prevent redundant API queries.
4. **Optimistic UI:** Actions like bookmarking a place execute immediately on the UI while sending a background request to `/api/v1/bookmarks`.

---

## 5. Performance, Accessibility & Rendering Optimization

* **Server-Side Rendering (SSR) & Incremental Static Regeneration (ISR):** Major city pages (`/city/tokyo`, `/city/paris`) utilize ISR with a 1-hour revalidation period for maximum SEO performance and fast initial load times.
* **Dynamic Client-Side Import for Maps:** Interactive map components (`Leaflet`) are imported dynamically (`next/dynamic` with `{ ssr: false }`) to avoid SSR window/DOM errors and optimize bundle size.
* **Next.js Image Optimization (`<Image />`):** All place photos and news thumbnails undergo responsive resizing, WebP conversion, and lazy loading.
* **Skeleton Screen Fallbacks:** React Suspense boundaries wrap feed components, presenting skeleton layout cards while AI summaries or feed batches are fetched.
* **Accessibility (a11y):** Full keyboard navigation support across search inputs, category filters, and modal dialogues using Radix UI accessible primitives.

---
*Created for the AI-Powered City Discovery Platform Project.*
