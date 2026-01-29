import { queryOptions } from '@tanstack/react-query';
import { fetchTranslations } from './api';

export const translationsQueryOptions = () =>
  queryOptions({
    queryKey: ['translations'],
    queryFn: () => fetchTranslations(),
  });
