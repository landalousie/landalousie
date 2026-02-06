import { CheckCircleIcon } from '#common/icons';
import { createEmptyCustomer } from '#pods/checkout/checkout.model.ts';
import { customerStore } from '#pods/checkout/checkout.stores';
import { NextPickup } from '#pods/next-pickup';
import { useShoppingCart } from '#pods/shopping-cart/shopping-cart.hooks';
import { translationsQueryOptions } from '#pods/translations/translations.query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import React from 'react';

export const OrderConfirmation = () => {
  const { data: translations } = useSuspenseQuery(translationsQueryOptions());
  const { clear } = useShoppingCart();

  React.useEffect(() => {
    customerStore.set(createEmptyCustomer());
    clear();
  }, []);

  return (
    <div
      className="flex flex-col items-center gap-10 py-10"
      aria-labelledby="confirmation-heading"
    >
      <div className="flex flex-col items-center gap-4 text-center animate-in fade-in zoom-in duration-500">
        <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full text-green-600 dark:text-green-400">
          <CheckCircleIcon className="w-16 h-16" />
        </div>
        <h2
          id="confirmation-heading"
          className="text-3xl md:text-4xl font-bold font-geist text-tbase-500"
        >
          {translations['orderConfirmed.title']}
        </h2>
        <p className="text-tbase-500/80 max-w-md">
          {translations['orderConfirmed.subtitle']}
        </p>
      </div>

      <div className="w-full max-w-2xl flex flex-col gap-8">
        <div className="w-full">
          <h3 className="text-xl font-bold mb-4 font-geist text-tbase-500">
            {translations['orderConfirmed.pickup.title']}
          </h3>
          <NextPickup />
        </div>

        <div className="flex justify-center">
          <Link
            to="/"
            className="bg-primary-900 text-primary-50 dark:bg-primary-50 dark:text-primary-950 font-bold py-3 px-8 rounded-full hover:opacity-90 transition-opacity"
          >
            {translations['orderConfirmed.continue.button']}
          </Link>
        </div>
      </div>
    </div>
  );
};
