export type CityRegion = 'north' | 'south' | 'east' | 'west' | 'central' | 'northeast';
export type CityTier = 1 | 2 | 3 | 4;

export interface City {
  id: string;
  name: string;
  slug: string;
  state: string;
  stateCode: string;
  region: CityRegion;
  tier: CityTier;
  coordinates: { lat: number; lng: number };
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
}

export interface CitySearchResult {
  id: string;
  name: string;
  slug: string;
  state: string;
  stateCode: string;
  emoji: string;
  tier: CityTier;
  tags?: string[];
}
