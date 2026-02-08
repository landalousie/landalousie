import { contentIsland } from '#core/clients/content-island.client';

import type { CallToAction } from './call-to-action.api-model';

export const fetchCallToAction = async () =>
  await contentIsland.getContent<CallToAction>({
    contentType: 'CallToAction',
  });
