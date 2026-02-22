import { contentIsland } from '#core/services/content-island.service';
import type { SiteConfig } from './site-config.api-model';

export const fetchSiteConfig = async () =>
  await contentIsland.getContent<SiteConfig>({
    contentType: 'SiteConfig',
    includeRelatedContent: true,
  });
