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
  bioTag?: BioTag;
}

export interface ProductConfig {
  maxUnits: number;
  currency: string;
  taxesLabel: string;
  priceUnit: string;
}
