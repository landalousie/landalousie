import { fetchSiteConfig } from '#contents/site-config';
import { queryOptions } from '@tanstack/react-query';
import { createServerFn } from '@tanstack/react-start';

const queryFn = createServerFn().handler(fetchSiteConfig);

export const siteConfigQueryOptions = () =>
  queryOptions({
    queryKey: ['site-config'],
    queryFn,
  });
