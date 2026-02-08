import { contentIsland } from '#core/clients/content-island.client';
import type { NextPickup } from './next-pickup.api-model';

export const fetchNextPickup = async () =>
  await contentIsland.getContent<NextPickup>({
    contentType: 'NextPickup',
  });
