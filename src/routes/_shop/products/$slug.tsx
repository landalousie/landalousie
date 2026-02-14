import { ArrowLeftIcon } from '#common/icons';
import { ShopLayout } from '#layouts';
import { ProductDetail } from '#pods/products';
import { translationsQueryOptions } from '#pods/translations';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/_shop/products/$slug')({
  validateSearch: (search) =>
    z.object({ id: z.string().optional() }).parse(search),
  component: Component,
});

function Component() {
  const { data: translations } = useSuspenseQuery(translationsQueryOptions());
  return (
    <ShopLayout
      hero={
        <Link
          to="/"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900"
        >
          <ArrowLeftIcon />
          {translations['page.navigateBack']}
        </Link>
      }
    >
      <ProductDetail />
    </ShopLayout>
  );
}
