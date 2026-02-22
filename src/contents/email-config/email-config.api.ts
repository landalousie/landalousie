import { contentIsland } from '#core/services/content-island.service';
import type { EmailConfig } from './email-config.api-model';

export const fetchEmailConfig = async () =>
  await contentIsland.getContent<EmailConfig>({
    contentType: 'EmailConfig',
  });
