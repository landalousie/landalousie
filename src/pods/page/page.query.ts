import { fetchPage, type PageId } from '#contents/page';
import { queryOptions } from '@tanstack/react-query';
import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

const schema = z.string<PageId>();
const queryFn = createServerFn()
  .inputValidator(schema)
  .handler(({ data }) => fetchPage(data));

export const pageQueryOptions = (pageId: PageId) =>
  queryOptions({
    queryKey: ['page', pageId],
    queryFn: () => queryFn({ data: pageId }),
  });
