import { contentIsland } from '#core/clients/content-island.client';
import type { SiteConfig } from './site-config.api-model';

export const fetchSiteConfig = async () =>
  await contentIsland.getContent<SiteConfig>({
    contentType: 'SiteConfig',
    includeRelatedContent: true,
  });
