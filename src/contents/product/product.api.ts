import { contentIsland } from '#core/services/content-island.service';
import type { ContentListQueryParams } from '@content-island/api-client';
import type { Product } from './product.api-model';

export const fetchProducts = async (
  params: ContentListQueryParams<Product> = {}
) =>
  await contentIsland.getContentList<Product>({
    ...params,
    contentType: 'Product',
  });
