import { contentIsland } from '#core/services/content-island.service';
import type { ProductConfig } from './product-config.api-model';

export const fetchProductConfig = async () =>
  await contentIsland.getContent<ProductConfig>({
    contentType: 'ProductConfig',
  });
