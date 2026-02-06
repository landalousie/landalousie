import { CloseIcon } from '#common/icons';
import { translationsQueryOptions } from '#pods/translations/translations.query.ts';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ClientOnly, Link } from '@tanstack/react-router';
import cx from 'clsx';
import React from 'react';
import { useShoppingCart } from '../shopping-cart.hooks';
import { ProductItem } from './product-item.component';

export const CartDrawer = () => {
  const { shoppingCart, isOpen, toggleOpen } = useShoppingCart();
  const { data: translations } = useSuspenseQuery(translationsQueryOptions());

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <ClientOnly>
      <div
        className={cx('relative z-50', { hidden: !isOpen })}
        aria-labelledby="slide-over-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className={cx(
            'fixed inset-0 bg-gray-500/75 backdrop-blur-sm transition-opacity duration-500 ease-in-out',
            { 'opacity-100': isOpen, 'opacity-0': !isOpen }
          )}
          onClick={() => toggleOpen()}
        ></div>

        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <div
                className={cx(
                  'pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out sm:duration-700',
                  {
                    'translate-x-0': isOpen,
                    'translate-x-full': !isOpen,
                  }
                )}
              >
                <div className="bg-surface flex h-full flex-col shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2
                        className="text-lg font-medium text-gray-900 dark:text-gray-100"
                        id="slide-over-title"
                      >
                        {translations['shoppingCart.drawer.title']}
                      </h2>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="relative -m-2 cursor-pointer p-2 text-gray-400 hover:text-gray-500"
                          onClick={() => toggleOpen()}
                        >
                          <span className="absolute -inset-0.5"></span>
                          <span className="sr-only">
                            {
                              translations[
                                'shoppingCart.drawer.a11y.closeButton'
                              ]
                            }
                          </span>
                          <CloseIcon />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                          {shoppingCart.products.length === 0 ? (
                            <li className="py-6 text-center text-gray-500 dark:text-gray-400">
                              {translations['shoppingCart.drawer.emptyCart']}
                            </li>
                          ) : (
                            shoppingCart.products.map((product) => (
                              <ProductItem key={product.id} product={product} />
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                      <p>{translations['shoppingCart.drawer.subtotal']}</p>
                      <p>{shoppingCart.totalLabel}</p>
                    </div>
                    <div className="flex justify-between text-base font-medium text-gray-900 dark:text-gray-100">
                      <p>
                        {translations['shoppingCart.drawer.total']}{' '}
                        {shoppingCart.taxesLabel}
                      </p>
                      <p>{shoppingCart.totalLabel}</p>
                    </div>
                    <div className="mt-6">
                      <Link
                        disabled={shoppingCart.total === 0}
                        to="/checkout"
                        className="bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400 flex items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white shadow-sm
                        aria-disabled:cursor-not-allowed aria-disabled:opacity-50
                        transition-colors duration-150"
                        onClick={() => {
                          if (shoppingCart.total === 0) {
                            return;
                          }
                          toggleOpen();
                        }}
                      >
                        {translations['shoppingCart.drawer.checkout']}
                      </Link>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        <button
                          type="button"
                          className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 cursor-pointer font-medium"
                          onClick={() => toggleOpen()}
                        >
                          {translations['shoppingCart.drawer.continueShopping']}
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientOnly>
  );
};
