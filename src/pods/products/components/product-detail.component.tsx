import { mapProductNameToSlug } from '#core/product';
import { AddProduct } from '#pods/shopping-cart/components';
import { translationsQueryOptions } from '#pods/translations/translations.query.ts';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams, useSearch } from '@tanstack/react-router';
import { marked } from 'marked';
import React from 'react';
import {
  productConfigQueryOptions,
  productListQueryOptions,
} from '../products.query';

export const ProductDetail = () => {
  const { slug } = useParams({ from: '/_shop/products/$slug' });
  const { id } = useSearch({ from: '/_shop/products/$slug' });
  const { data: productConfig } = useSuspenseQuery(productConfigQueryOptions());
  const { data: products } = useSuspenseQuery(
    productListQueryOptions(productConfig)
  );
  const { data: translations } = useSuspenseQuery(translationsQueryOptions());

  const product = React.useMemo(
    () =>
      products.find(
        (p) =>
          mapProductNameToSlug(p.name) === slug &&
          (Boolean(id) ? p?.id === id : true)
      ),
    [products, slug, id]
  );

  if (!product) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-gray-500">
        {translations['product-detail.not-found']}
      </div>
    );
  }

  const longDescription = marked(product.longDescription);
  return (
    <div className="bg-surface">
      <div className="pt-6 pb-16 sm:pb-24">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100 sm:col-span-1">
              <img
                src={product.image.url}
                alt={product.name}
                className="h-full w-full object-cover object-center"
              />
              {product.bioTag?.logo?.url && (
                <div className="absolute top-4 left-4 z-10 rounded-md bg-white/90 p-2 shadow-sm backdrop-blur-sm transition-transform duration-300 hover:scale-105">
                  <img
                    src={product.bioTag.logo.url}
                    alt={product.bioTag.logo.name}
                    className="h-8 w-auto"
                  />
                </div>
              )}
            </div>

            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <div className="mb-4">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                  {product.name}
                </h2>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {product.shortDescription}
                </p>
              </div>

              <div className="mt-3">
                <h3 className="sr-only">
                  {translations['product-detail.a11y.product-info']}
                </h3>
                <div className="flex items-baseline gap-2">
                  <p className="text-primary-600 dark:text-primary-400 text-3xl font-extrabold tracking-tight">
                    {product.priceLabel}
                  </p>
                  <span className="text-lg font-medium text-gray-500 dark:text-gray-400">
                    {product.priceUnit}
                  </span>
                </div>
              </div>

              <div className="mt-6 lg:hidden">
                <AddProduct productId={product.id} canRemove />
              </div>

              <div className="mt-6">
                <h4 className="sr-only">
                  {translations['product-detail.a11y.description']}
                </h4>
                <div className="space-y-6 text-base text-gray-700 dark:text-gray-300">
                  <div
                    dangerouslySetInnerHTML={{ __html: longDescription }}
                  ></div>
                </div>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-700 hidden lg:block">
                <AddProduct productId={product.id} canRemove />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
