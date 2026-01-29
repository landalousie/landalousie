import { contentIsland } from '#core/clients';
import { createServerFn } from '@tanstack/react-start';
import type { NextPickup } from './next-pickup.api-model';

export const fetchNextPickup = createServerFn().handler(
  async () =>
    await contentIsland.getContent<NextPickup>({
      contentType: 'NextPickup',
    })
);
