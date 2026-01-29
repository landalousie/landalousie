import { queryOptions } from '@tanstack/react-query';
import { fetchPage } from './api';
import type { PageId } from './api/page.api-model';

export const pageQueryOptions = (pageId: PageId) =>
  queryOptions({
    queryKey: ['page', pageId],
    queryFn: () => fetchPage({ data: pageId }),
  });
