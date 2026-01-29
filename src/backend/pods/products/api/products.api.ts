import { contentIsland } from '#core/clients';
import type { Product } from './products.api-model';

export const fetchProducts = async () =>
  await contentIsland.getContentList<Product>({
    contentType: 'Product',
    includeRelatedContent: true,
  });
