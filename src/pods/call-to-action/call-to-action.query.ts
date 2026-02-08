import { fetchCallToAction } from '#contents/call-to-action';
import { queryOptions } from '@tanstack/react-query';
import { createServerFn } from '@tanstack/react-start';

const queryFn = createServerFn().handler(fetchCallToAction);

export const callToActionQueryOptions = () =>
  queryOptions({
    queryKey: ['call-to-action'],
    queryFn,
  });
