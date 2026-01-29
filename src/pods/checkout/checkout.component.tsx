import { checkout } from '#backend/pods/products';
import { useValidations } from '#common/hooks/validations.hook.ts';
import { useShoppingCart } from '#pods/shopping-cart/shopping-cart.hooks';
import { translationsQueryOptions } from '#pods/translations/translations.query.ts';
import { useStore } from '@nanostores/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react';
import { COUNTRY_PHONE_CODES } from './checkout.constants';
import type * as model from './checkout.model';
import { userStore } from './checkout.stores';
import { suite } from './checkout.validations';

export const Checkout = () => {
  const { shoppingCart, persistedProducts } = useShoppingCart();
  const user = useStore(userStore);
  const validations = useValidations<model.User>(suite);
  const { data: translations } = useSuspenseQuery(translationsQueryOptions());

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const newValues = { ...user, [name]: value };
    userStore.set(newValues);
    validations.validate(newValues, name as keyof model.User);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await validations.validate(user)) {
      const response = await checkout({
        data: {
          products: persistedProducts,
          user: {
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            phone: `${user.phonePrefix} ${user.phone}`,
          },
        },
      });
      if (response.url) {
        window.location.href = response.url;
      } else {
        console.error('Checkout failed: No URL returned');
      }
    }
  };

  return (
    <div
      className="flex flex-col gap-8 md:flex-row md:items-start"
      aria-labelledby="checkout-heading"
    >
      <h2 className="sr-only" id="checkout-heading">
        {translations['checkout.a11y.title']}
      </h2>

      <section className="flex-1 bg-white dark:bg-primary-900 rounded-2xl p-6 shadow-sm">
        <h3 className="text-2xl font-bold mb-6 font-geist text-tbase-500">
          {translations['checkout.form.title']}
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-tbase-500/80 mb-1"
              >
                {translations['checkout.form.firstName']}
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                value={user.firstName}
                onChange={handleChange}
                className="w-full bg-primary-50 dark:bg-primary-800 border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-tbase-500 focus:ring-2 focus:ring-secondary-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-tbase-500/80 mb-1"
              >
                {translations['checkout.form.lastName']}
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                value={user.lastName}
                onChange={handleChange}
                className="w-full bg-primary-50 dark:bg-primary-800 border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-tbase-500 focus:ring-2 focus:ring-secondary-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-tbase-500/80 mb-1"
              >
                {translations['checkout.form.email']}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={user.email}
                onChange={handleChange}
                className="w-full bg-primary-50 dark:bg-primary-800 border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-tbase-500 focus:ring-2 focus:ring-secondary-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-tbase-500/80 mb-1"
              >
                {translations['checkout.form.phone']}
              </label>
              <div className="flex gap-2">
                <select
                  name="phonePrefix"
                  value={user.phonePrefix}
                  onChange={handleChange}
                  className="bg-primary-50 dark:bg-primary-800 border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-tbase-500 focus:ring-2 focus:ring-secondary-500 focus:border-transparent outline-none transition-all"
                  aria-label="Country Code"
                >
                  {COUNTRY_PHONE_CODES.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.code}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={user.phone}
                  onChange={handleChange}
                  className="flex-1 min-w-0 bg-primary-50 dark:bg-primary-800 border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-tbase-500 focus:ring-2 focus:ring-secondary-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-secondary-900 text-white dark:bg-secondary-100 dark:text-secondary-950 font-bold py-4 px-6 rounded-full hover:opacity-90 transition-opacity"
            >
              {translations['checkout.form.submit-button']}{' '}
              {shoppingCart.totalLabel}
            </button>
          </div>
        </form>
      </section>

      <section
        className="w-full md:w-110 bg-primary-50 dark:bg-primary-800/50 rounded-2xl p-6"
        aria-labelledby="order-summary"
      >
        <h3
          className="text-xl font-bold mb-4 font-geist text-tbase-500"
          id="order-summary"
        >
          {translations['checkout.order.title']}
        </h3>
        <div className="flex flex-col gap-6">
          {shoppingCart.products.length === 0 ? (
            <p className="text-tbase-500/60">
              {translations['checkout.order.empty-cart']}
            </p>
          ) : (
            <ul className="flex flex-col gap-4">
              {shoppingCart.products.map((product) => (
                <li key={product.id} className="flex gap-4">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700 bg-white">
                    <img
                      src={product.image.url}
                      alt={product.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-center">
                    <div className="flex justify-between items-start">
                      <h4
                        className="text-sm font-medium text-tbase-500 line-clamp-2"
                        title={product.name}
                      >
                        {product.name}
                      </h4>
                      <p className="ml-4 text-sm font-medium text-tbase-500 whitespace-nowrap">
                        {product.calculatedPriceLabel}
                      </p>
                    </div>
                    <div className="mt-1 flex justify-between items-end text-xs text-tbase-500/70">
                      <p>
                        {product.quantity} x {product.priceLabel}{' '}
                        {product.priceUnit}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <hr className="border-tbase-500/10 my-1" />

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-sm text-tbase-500/80">
              <span>{translations['checkout.order.subtotal']}</span>
              <span>{shoppingCart.totalLabel}</span>
            </div>
            <div className="flex justify-between items-center font-bold text-lg text-tbase-500 mt-2">
              <span>{translations['checkout.order.total']}</span>
              <span>{shoppingCart.totalLabel}</span>
            </div>
            <p className="text-xs text-right text-tbase-500/60">
              {shoppingCart.taxesLabel}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
