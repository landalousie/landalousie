import { contentIsland } from '#core/services/content-island.service';
import type { CallToAction } from './call-to-action.api-model';

export const fetchCallToAction = async () =>
  await contentIsland.getContent<CallToAction>({
    contentType: 'CallToAction',
  });
