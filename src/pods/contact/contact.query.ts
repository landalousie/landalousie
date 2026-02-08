import { fetchContact } from '#contents/contact';
import { queryOptions } from '@tanstack/react-query';
import { createServerFn } from '@tanstack/react-start';

const queryFn = createServerFn().handler(fetchContact);

export const contactQueryOptions = () =>
  queryOptions({
    queryKey: ['contact'],
    queryFn,
  });
