import { fetchNextPickup } from '#contents/next-pickup';
import { queryOptions } from '@tanstack/react-query';
import { createServerFn } from '@tanstack/react-start';

const queryFn = createServerFn().handler(fetchNextPickup);

export const nextPickupQueryOptions = () =>
  queryOptions({
    queryKey: ['next-pickup'],
    queryFn,
  });
