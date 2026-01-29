import { contentIsland } from '#core/clients';
import { createServerFn } from '@tanstack/react-start';
import type { CallToAction } from './call-to-action.api-model';

export const fetchCallToAction = createServerFn().handler(
  async () =>
    await contentIsland.getContent<CallToAction>({
      contentType: 'CallToAction',
    })
);
