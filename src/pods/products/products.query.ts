import { queryOptions } from '@tanstack/react-query';
import { fetchProductConfig, fetchProducts } from './api';
import {
  mapProductConfigFromApiToModel,
  mapProductListFromApiToModel,
} from './products.mappers';
import { ProductConfig } from './products.model';

export const productConfigQueryOptions = () =>
  queryOptions({
    queryKey: ['product-config'],
    queryFn: () => fetchProductConfig(),
    select: (productConfig) => mapProductConfigFromApiToModel(productConfig),
  });

export const productListQueryOptions = (productConfig: ProductConfig) =>
  queryOptions({
    queryKey: ['products'],
    queryFn: () => fetchProducts(),
    select: (products) => mapProductListFromApiToModel(products, productConfig),
    enabled: Boolean(productConfig),
  });
