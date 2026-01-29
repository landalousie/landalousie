import { contentIsland } from '#core/clients';
import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import type { PageId, Page } from './page.api-model';

const schema = z.string<PageId>();

export const fetchPage = createServerFn()
  .inputValidator(schema)
  .handler(
    async ({ data }) =>
      await contentIsland.getContent<Page>({
        contentType: 'Page',
        'fields.pageId': data,
      })
  );
