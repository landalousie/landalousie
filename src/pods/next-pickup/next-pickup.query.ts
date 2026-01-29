import { queryOptions } from '@tanstack/react-query';
import { fetchNextPickup } from './api';

export const nextPickupQueryOptions = () =>
  queryOptions({
    queryKey: ['next-pickup'],
    queryFn: () => fetchNextPickup(),
  });
