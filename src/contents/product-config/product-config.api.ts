import { contentIsland } from '#core/clients/content-island.client';
import type { ProductConfig } from './product-config.api-model';

export const fetchProductConfig = async () =>
  await contentIsland.getContent<ProductConfig>({
    contentType: 'ProductConfig',
  });
