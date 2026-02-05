import { TrashIcon } from '#common/icons';
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
    <li className="flex flex-col py-6 gap-4">
      <div className="flex justify-between">
        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
          <img
            src={product.image.url}
            alt={product.name}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col justify-between">
          <div className="flex justify-between items-start">
            <h3 className="line-clamp-2 pr-4 text-base font-medium text-gray-900 dark:text-gray-100">
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
            <button
              type="button"
              className="-m-2 p-2 text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300"
              onClick={() => remove(product.id)}
              aria-label={translations['shoppingCart.drawer.deleteItem']}
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="whitespace-nowrap font-bold text-gray-900 dark:text-gray-100">
                {product.calculatedPriceLabel}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {product.priceLabel} {product.priceUnit}
              </p>
            </div>

            <AddProduct
              className="hidden w-32 sm:block"
              productId={String(product.id)}
            />
          </div>
        </div>
      </div>
      <AddProduct
        className="mt-4 w-full sm:hidden"
        productId={String(product.id)}
      />
    </li>
  );
};
