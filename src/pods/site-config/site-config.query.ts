import { queryOptions } from '@tanstack/react-query';
import { fetchSiteConfig } from './api';

export const siteConfigQueryOptions = () =>
  queryOptions({
    queryKey: ['site-config'],
    queryFn: () => fetchSiteConfig(),
  });
