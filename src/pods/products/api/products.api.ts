import { contentIsland } from '#core/clients';
import { createServerFn } from '@tanstack/react-start';
import type { Product, ProductConfig } from './products.api-model';

export const fetchProducts = createServerFn().handler(
  async () =>
    await contentIsland.getContentList<Product>({
      contentType: 'Product',
      includeRelatedContent: true,
    })
);

export const fetchProductConfig = createServerFn().handler(
  async () =>
    await contentIsland.getContent<ProductConfig>({
      contentType: 'ProductConfig',
    })
);
