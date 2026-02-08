import { contentIsland } from '#core/clients/content-island.client';
import type { EmailConfig } from './email-config.api-model';

export const fetchEmailConfig = async () =>
  await contentIsland.getContent<EmailConfig>({
    contentType: 'EmailConfig',
  });
