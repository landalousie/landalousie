import { contentIsland } from '#core/services/content-island.service';
import type { Page } from './page.api-model';

export const fetchPage = async (pageId: string) =>
  await contentIsland.getContent<Page>({
    contentType: 'Page',
    'fields.pageId': pageId,
  });
