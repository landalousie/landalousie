import { mapToPriceLabel } from '#core/product';
import type * as api from './api/products.api-model';
import type * as model from './products.model';

const mapProductFromApiToModel = (
  product: api.Product,
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
  bioTag: product.bioTag,
});

export const mapProductListFromApiToModel = (
  products: api.Product[],
  productConfig: model.ProductConfig
): model.Product[] =>
  Array.isArray(products)
    ? products.map((product) =>
        mapProductFromApiToModel(product, productConfig)
      )
    : [];

export const mapProductConfigFromApiToModel = (
  productConfig: api.ProductConfig
): model.ProductConfig => ({
  currency: productConfig.currency,
  taxesLabel: productConfig.taxesLabel,
  maxUnits: productConfig.maxUnits,
  priceUnit: productConfig.priceUnit,
});
