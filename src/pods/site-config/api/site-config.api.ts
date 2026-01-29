import { contentIsland } from '#core/clients';
import { createServerFn } from '@tanstack/react-start';
import type { SiteConfig } from './site-config.api-model';

export const fetchSiteConfig = createServerFn().handler(
  async () =>
    await contentIsland
      .getContent<SiteConfig>({
        contentType: 'SiteConfig',
        includeRelatedContent: true,
      })
      .then((siteConfig) => ({
        ...siteConfig,
        titleFont: {
          ...siteConfig?.titleFont,
          url: siteConfig?.titleFont.url
            ? siteConfig?.titleFont.url
            : 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap',
        },
        bodyFont: {
          ...siteConfig?.bodyFont,
          url: siteConfig?.bodyFont.url
            ? siteConfig?.bodyFont.url
            : 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&display=swap',
        },
      }))
);
