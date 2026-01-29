import { contentIsland } from '#core/clients';
import { createServerFn } from '@tanstack/react-start';
import type { Translations } from './translations.api-model';

export const fetchTranslations = createServerFn().handler(
  async () =>
    await contentIsland.getContent<Translations>({
      contentType: 'Translations',
    })
);
