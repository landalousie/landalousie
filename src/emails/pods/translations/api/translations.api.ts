import { contentIsland } from '#core/clients/content-island.client';
import type { EmailTranslations } from './translations.api-model';

export const fetchTranslations = async () =>
  await contentIsland.getContent<EmailTranslations>({
    contentType: 'EmailTranslations',
  });
