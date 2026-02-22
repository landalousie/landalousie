import { contentIsland } from '#core/services/content-island.service';
import type { NextPickup } from './next-pickup.api-model';

export const fetchNextPickup = async () =>
  await contentIsland.getContent<NextPickup>({
    contentType: 'NextPickup',
  });
