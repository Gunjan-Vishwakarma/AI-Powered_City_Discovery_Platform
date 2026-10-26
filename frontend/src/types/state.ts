import { CityRegion } from './city';

export interface StateCity {
  name: string;
  slug: string;
  tier?: 1 | 2 | 3 | 4;
  isScraped?: boolean;
}

export interface State {
  id?: string;
  name: string;
  slug: string;
  stateCode: string;
  region: CityRegion;
  type: 'State' | 'Union Territory';
  capital?: string;
  totalCities: number;
  scrapedCitiesCount?: number;
  cities: string[];
  cityDetails?: StateCity[];
  description?: string;
  isActive?: boolean;
}
