import type { Product } from '#contents/product';
import { ProductConfig } from '#contents/product-config';
import { mapToPriceLabel } from '#core/product';
import type * as model from './products.model';

const mapProductFromApiToModel = (
  product: Product,
  productConfig: model.ProductConfig
): model.Product => ({
  id: product.id,
  name: product.name,
  price: product.price,
  priceLabel: mapToPriceLabel(product.price),
  priceUnit: productConfig.priceUnit,
  image: product.image,
  longDescription: product.longDescription,
  shortDescription: product.shortDescription,
  isOutOfStock: product.isOutOfStock,
  bioTag: product.bioTag,
});

export const mapProductListFromApiToModel = (
  products: Product[],
  productConfig: model.ProductConfig
): model.Product[] =>
  Array.isArray(products)
    ? products.map((product) =>
        mapProductFromApiToModel(product, productConfig)
      )
    : [];

export const mapProductConfigFromApiToModel = (
  productConfig: ProductConfig
): model.ProductConfig => ({
  currency: productConfig.currency,
  taxesLabel: productConfig.taxesLabel,
  maxUnits: productConfig.maxUnits,
  priceUnit: productConfig.priceUnit,
  outOfStockTag: productConfig.outOfStockTag,
});
