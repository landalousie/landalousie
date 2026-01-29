import { mapToPriceLabel } from '#core/product';
import type { ProductConfig } from '#pods/products/products.model';
import type { Product } from './shopping-cart.model';

export const calculateTotalPrice = (
  products: Product[],
  productConfig: ProductConfig
): string =>
  `${mapToPriceLabel(
    products.reduce((total, product) => total + product.calculatedPrice, 0)
  )} ${productConfig.currency}`;
