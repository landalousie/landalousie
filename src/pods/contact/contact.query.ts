import { queryOptions } from '@tanstack/react-query';
import { fetchContact } from './api';

export const contactQueryOptions = () =>
  queryOptions({
    queryKey: ['contact'],
    queryFn: () => fetchContact(),
  });
