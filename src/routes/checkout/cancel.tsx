import { translationsQueryOptions } from '#pods/translations';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/checkout/cancel')({
  component: Component,
});

function Component() {
  const { data: translations } = useSuspenseQuery(translationsQueryOptions());
  return <div>{translations['checkout.cancel']}</div>;
}
