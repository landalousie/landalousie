import { fetchProducts } from '#contents/product';
import { fetchProductConfig } from '#contents/product-config';
import { queryOptions } from '@tanstack/react-query';
import { createServerFn } from '@tanstack/react-start';
import {
  mapProductConfigFromApiToModel,
  mapProductListFromApiToModel,
} from './products.mappers';
import { ProductConfig } from './products.model';

const productConfigQueryFn = createServerFn().handler(fetchProductConfig);

export const productConfigQueryOptions = () =>
  queryOptions({
    queryKey: ['product-config'],
    queryFn: productConfigQueryFn,
    select: (productConfig) => mapProductConfigFromApiToModel(productConfig),
  });

const productsQueryFn = createServerFn().handler(() =>
  fetchProducts({ includeRelatedContent: true })
);

export const productListQueryOptions = (productConfig: ProductConfig) =>
  queryOptions({
    queryKey: ['products'],
    queryFn: productsQueryFn,
    select: (products) => mapProductListFromApiToModel(products, productConfig),
    enabled: Boolean(productConfig),
  });
