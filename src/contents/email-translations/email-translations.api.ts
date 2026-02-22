import { contentIsland } from '#core/services/content-island.service';
import type { EmailTranslations } from './email-translations.api-model';

export const fetchEmailTranslations = async () =>
  await contentIsland.getContent<EmailTranslations>({
    contentType: 'EmailTranslations',
  });
