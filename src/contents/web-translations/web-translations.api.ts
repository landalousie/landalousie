import { contentIsland } from '#core/clients/content-island.client';
import type { WebTranslations } from './web-translations.api-model';

export const fetchWebTranslations = async () =>
  await contentIsland.getContent<WebTranslations>({
    contentType: 'WebTranslations',
  });
