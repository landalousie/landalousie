import { mapProductNameToSlug } from '#core/product';
import { translationsQueryOptions } from '#pods/translations/translations.query.ts';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import React from 'react';
import { useShoppingCart } from '../shopping-cart.hooks';
import type * as model from '../shopping-cart.model';
import { AddProduct } from './add-product.component';

interface Props {
  product: model.Product;
}

export const ProductItem: React.FC<Props> = (props) => {
  const { product } = props;
  const { remove, toggleOpen } = useShoppingCart();
  const { data: translations } = useSuspenseQuery(translationsQueryOptions());
  return (
    <li className="flex py-6">
      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={product.image.url}
          alt={product.name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col gap-1">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900 dark:text-gray-100">
            <h3>
              <Link
                className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                to="/products/$slug"
                params={{
                  slug: mapProductNameToSlug(product.name),
                }}
                search={{ id: product.id }}
                onClick={() => toggleOpen()}
              >
                {product.name}
              </Link>
            </h3>
            <p className="ml-4">{product.calculatedPriceLabel}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {product.priceLabel} {product.priceUnit}
          </p>
        </div>
        <div className="flex flex-1 items-center justify-between gap-4 text-sm">
          <AddProduct className="flex-1" productId={String(product.id)} />

          <div className="flex">
            <button
              type="button"
              className="cursor-pointer font-medium text-red-600 hover:text-red-500"
              onClick={() => remove(product.id)}
            >
              {translations['shopping-cart.drawer.delete-item']}
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};
