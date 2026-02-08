import type { Product } from '#pods/shopping-cart';
import type * as model from './checkout.model';

export const mapToCheckoutProductList = (
  products: Product[]
): model.Product[] =>
  Array.isArray(products)
    ? products.map((p) => ({
        id: p.id,
        quantity: p.quantity,
      }))
    : [];
