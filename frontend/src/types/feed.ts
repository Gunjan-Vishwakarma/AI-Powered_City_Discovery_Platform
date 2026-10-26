export type FeedCategory = 'food' | 'culture' | 'language' | 'places' | 'festivals' | 'news';

export interface FoodItem {
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

export interface CultureItem {
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

export interface LanguageProfile {
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

export interface PlaceItem {
  id: string;
  citySlug: string;
  name: string;
  type: 'monument' | 'temple' | 'museum' | 'park' | 'market' | 'beach' | 'fort' | 'palace' | 'natural' | 'hidden_gem' | 'viewpoint' | 'ghat';
  isHiddenGem: boolean;
  isUnescoHeritage: boolean;
  isAsiProtected: boolean;
  neighborhood: string;
  entryFee: { indian: number; foreigner: number };
  bestTimeToVisit: string;
  rating: number;
  description: string;
  aiSummary: string;
  historicalPeriod: string;
  popularityScore: number;
  emoji: string;
  tags: string[];
}

export interface FestivalItem {
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

export interface NewsItem {
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
