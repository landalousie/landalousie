import type { Media } from '@content-island/api-client';

export interface BioTag {
  id: string;
  language: 'fr';
  lastUpdate: string; // Stores the date in ISO 8601 format. For example: 2021-09-10T19:30:00.000Z
  logo: Media;
}

export interface Product {
  id: string;
  language: 'fr';
  lastUpdate: string; // Stores the date in ISO 8601 format. For example: 2021-09-10T19:30:00.000Z
  name: string;
  price: number;
  image: Media;
  longDescription: string;
  shortDescription?: string;
  isOutOfStock?: boolean;
  bioTag?: BioTag;
}

export interface ProductConfig {
  id: string;
  language: 'fr';
  lastUpdate: string; // Stores the date in ISO 8601 format. For example: 2021-09-10T19:30:00.000Z
  maxUnits: number;
  currency: string;
  taxesLabel: string;
  priceUnit: string;
  outOfStockTag: Media;
}
