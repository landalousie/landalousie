import { contentIsland } from '#core/clients/content-island.client';
import type { EmailTranslations } from './email-translations.api-model';

export const fetchEmailTranslations = async () =>
  await contentIsland.getContent<EmailTranslations>({
    contentType: 'EmailTranslations',
  });
