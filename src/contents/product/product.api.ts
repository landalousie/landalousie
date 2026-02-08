import { contentIsland } from '#core/clients/content-island.client';
import type { ContentListQueryParams } from '@content-island/api-client';
import type { Product } from './product.api-model';

export const fetchProducts = async (
  params: ContentListQueryParams<Product> = {}
) =>
  await contentIsland.getContentList<Product>({
    ...params,
    contentType: 'Product',
  });
