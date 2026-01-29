import type * as productListPod from '#pods/products/products.model';

export interface PersistedProduct {
  id: string;
  quantity: number;
}

export type Product = productListPod.Product & {
  calculatedPrice: number;
  calculatedPriceLabel: string;
  quantity: number;
};

export interface ShoppingCart {
  products: Product[];
  totalItems: number;
  total: number;
  totalLabel: string;
  taxesLabel: string;
}
