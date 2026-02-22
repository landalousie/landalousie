import { contentIsland } from '#core/services/content-island.service';
import type { WebTranslations } from './web-translations.api-model';

export const fetchWebTranslations = async () =>
  await contentIsland.getContent<WebTranslations>({
    contentType: 'WebTranslations',
  });
