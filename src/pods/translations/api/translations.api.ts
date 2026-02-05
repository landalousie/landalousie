import { contentIsland } from '#core/clients';
import { createServerFn } from '@tanstack/react-start';
import type { WebTranslations } from './translations.api-model';

export const fetchTranslations = createServerFn().handler(
  async () =>
    await contentIsland.getContent<WebTranslations>({
      contentType: 'WebTranslations',
    })
);
