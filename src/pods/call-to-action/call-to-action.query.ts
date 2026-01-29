import { queryOptions } from '@tanstack/react-query';
import { fetchCallToAction } from './api';

export const callToActionQueryOptions = () =>
  queryOptions({
    queryKey: ['call-to-action'],
    queryFn: () => fetchCallToAction(),
  });
