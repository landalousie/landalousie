import { contentIsland } from '#core/clients';
import { createServerFn } from '@tanstack/react-start';
import type { SiteConfig } from './site-config.api-model';

export const fetchSiteConfig = createServerFn().handler(
  async () =>
    await contentIsland.getContent<SiteConfig>({
      contentType: 'SiteConfig',
      includeRelatedContent: true,
    })
);
