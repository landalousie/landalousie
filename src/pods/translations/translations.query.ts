import { fetchWebTranslations } from '#contents/web-translations';
import { queryOptions } from '@tanstack/react-query';
import { createServerFn } from '@tanstack/react-start';

const queryFn = createServerFn().handler(fetchWebTranslations);

export const translationsQueryOptions = () =>
  queryOptions({
    queryKey: ['translations'],
    queryFn,
  });
