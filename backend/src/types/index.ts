export type CityRegion = 'north' | 'south' | 'east' | 'west' | 'central' | 'northeast';
export type CityTier = 1 | 2 | 3 | 4;

export interface ICity {
  id: string;
  name: string;
  slug: string;
  state: string;
  stateCode: string;
  region: CityRegion;
  tier: CityTier;
  location?: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  population: string;
  founded: number;
  nicknames: string[];
  officialLanguages: string[];
  otherLanguages: string[];
  description: string;
  aiOverview: string;
  coverImage: string;
  thumbnailGradient: string;
  emoji: string;
  tags: string[];
  popularCategories: string[];
  highlights: string[];
  isActive?: boolean;
}

export interface IFoodItem {
  id: string;
  citySlug: string;
  name: string;
  type: 'dish' | 'street_food' | 'sweet' | 'beverage' | 'snack' | 'full_meal';
  mealType: string[];
  isVegetarian: boolean;
  isVegan: boolean;
  region: string;
  description: string;
  aiSummary: string;
  ingredients: string[];
  whereToFind: string[];
  priceRange: 'budget' | 'mid' | 'premium';
  popularityScore: number;
  emoji: string;
  tags: string[];
}

export interface ICultureItem {
  id: string;
  citySlug: string;
  name: string;
  type: 'art' | 'dance' | 'music' | 'theatre' | 'craft' | 'textile' | 'tradition' | 'architecture';
  era: string;
  description: string;
  aiSummary: string;
  significance: string;
  whereToExperience: string[];
  isUnescoHeritage: boolean;
  popularityScore: number;
  emoji: string;
  tags: string[];
}

export interface ILanguageProfile {
  id: string;
  citySlug: string;
  name: string;
  nativeName: string;
  script: string;
  isoCode: string;
  family: string;
  role: 'official' | 'regional' | 'widely_spoken' | 'minority';
  nativeSpeakers: string;
  origin: string;
  aiSummary: string;
  uniqueFeatures: string[];
  commonPhrases: {
    english: string;
    local: string;
    transliteration: string;
    pronunciation: string;
  }[];
  dialects: string[];
  relatedLanguages?: string[];
  isClassicalLanguage: boolean;
  literaryHistory: string;
  emoji: string;
}

export interface IPlaceItem {
  id: string;
  citySlug: string;
  name: string;
  type: 'monument' | 'temple' | 'museum' | 'park' | 'market' | 'beach' | 'fort' | 'palace' | 'natural' | 'hidden_gem' | 'viewpoint' | 'ghat';
  isHiddenGem: boolean;
  isUnescoHeritage: boolean;
  isAsiProtected: boolean;
  neighborhood: string;
  location?: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };
  entryFee: {
    indian: number;
    foreigner: number;
  };
  bestTimeToVisit: string;
  rating: number;
  description: string;
  aiSummary: string;
  historicalPeriod: string;
  popularityScore: number;
  emoji: string;
  tags: string[];
}

export interface IFestivalItem {
  id: string;
  citySlug: string;
  name: string;
  localName: string;
  type: 'religious' | 'cultural' | 'harvest' | 'music' | 'film' | 'folk' | 'civic';
  religion: string | null;
  month: number;
  duration: string;
  isNationalHoliday: boolean;
  description: string;
  aiSummary: string;
  significance: string;
  howItsCelebrated: string[];
  bestPlacesToWitness: string[];
  popularityScore: number;
  emoji: string;
  tags: string[];
}

export interface INewsItem {
  id: string;
  citySlug: string;
  title: string;
  summary: string;
  aiSummary: string;
  sourceName: string;
  publishedAt: string;
  category: 'civic' | 'culture' | 'sports' | 'politics' | 'business' | 'development' | 'community';
  tags: string[];
  popularityScore: number;
  emoji: string;
}

export interface IBookmark {
  id: string;
  userId?: string;
  itemId: string;
  itemType: 'city' | 'food' | 'culture' | 'language' | 'place' | 'festival' | 'news';
  citySlug: string;
  title: string;
  subtitle?: string;
  emoji?: string;
  savedAt: string;
}

export interface IStateCity {
  name: string;
  slug: string;
  tier?: CityTier;
  isScraped?: boolean;
}

export interface IState {
  id: string;
  name: string;
  slug: string;
  stateCode: string;
  region: CityRegion;
  type: 'State' | 'Union Territory';
  capital?: string;
  totalCities: number;
  scrapedCitiesCount?: number;
  cities: string[];
  cityDetails?: IStateCity[];
  description?: string;
  isActive?: boolean;
}

