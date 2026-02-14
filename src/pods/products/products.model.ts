import type { Media } from '@content-island/api-client';

export interface BioTag {
  id: string;
  logo: Media;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  priceLabel: string;
  priceUnit: string;
  image: Media;
  longDescription: string;
  shortDescription?: string;
  isOutOfStock?: boolean;
  bioTag?: BioTag;
  maxUnits: number;
}

export interface ProductConfig {
  currency: string;
  taxesLabel: string;
  priceUnit: string;
  outOfStockTag: Media;
}
