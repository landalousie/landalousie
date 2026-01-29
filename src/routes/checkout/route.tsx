import { ArrowLeftIcon } from '#common/icons';
import { Checkout } from '#pods/checkout';
import { translationsQueryOptions } from '#pods/translations';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/checkout')({
  component: Component,
});

function Component() {
  const { data: translations } = useSuspenseQuery(translationsQueryOptions());
  return (
    <>
      <Link
        to="/"
        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900"
      >
        <ArrowLeftIcon />
        {translations['checkout.navigate-back']}
      </Link>
      <Outlet />
      <Checkout />
    </>
  );
}
