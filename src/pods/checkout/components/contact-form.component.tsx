import { checkout } from '#backend/pods/products';
import { ErrorMessage, Input, Label, Select } from '#common/component';
import { useValidations } from '#common/hooks/validations.hook.ts';
import { CloseIcon } from '#common/icons';
import { useShoppingCart } from '#pods/shopping-cart/shopping-cart.hooks';
import { translationsQueryOptions } from '#pods/translations/translations.query.ts';
import { useStore } from '@nanostores/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react';
import { COUNTRY_PHONE_CODES } from '../checkout.constants';
import type * as model from '../checkout.model';
import { userStore } from '../checkout.stores';
import { suite } from '../checkout.validations';

export const ContactForm = () => {
  const { shoppingCart, persistedProducts } = useShoppingCart();
  const user = useStore(userStore);
  const { data: translations } = useSuspenseQuery(translationsQueryOptions());
  const validations = useValidations<model.User>(suite(translations));

  const isKnownPrefix = React.useMemo(
    () => COUNTRY_PHONE_CODES.some((c) => c.code === user.phonePrefix),
    [user.phonePrefix]
  );
  const [isCustomPrefix, setIsCustomPrefix] = React.useState(!isKnownPrefix);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const newValues = { ...user, [name]: value };
    userStore.set(newValues);
    validations.validate(newValues, name as keyof model.User);
  };

  const handlePrefixSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value === 'custom') {
      setIsCustomPrefix(true);
      const newValues = { ...user, phonePrefix: '+' };
      userStore.set(newValues);
    } else {
      handleChange(e);
    }
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <Label htmlFor="firstName">
            {translations['checkout.form.firstName']}
          </Label>
          <Input
            id="firstName"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
          />
          <ErrorMessage className="mt-1">
            {validations.getMessage('firstName')}
          </ErrorMessage>
        </div>

        <div className="flex-1">
          <Label htmlFor="lastName">
            {translations['checkout.form.lastName']}
          </Label>
          <Input
            id="lastName"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
          />
          <ErrorMessage className="mt-1">
            {validations.getMessage('lastName')}
          </ErrorMessage>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <Label htmlFor="email">{translations['checkout.form.email']}</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          <ErrorMessage className="mt-1">
            {validations.getMessage('email')}
          </ErrorMessage>
        </div>
        <div className="flex-1">
          <Label htmlFor="phone">{translations['checkout.form.phone']}</Label>
          <div className="flex gap-2">
            {!isCustomPrefix ? (
              <Select
                name="phonePrefix"
                value={user.phonePrefix}
                onChange={handlePrefixSelect}
                aria-label="Country Code"
              >
                {COUNTRY_PHONE_CODES.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.code}
                  </option>
                ))}
                <option value="custom">
                  🌍 {translations['checkout.form.customPhonePrefix']}
                </option>
              </Select>
            ) : (
              <div className="relative">
                <Input
                  type="text"
                  name="phonePrefix"
                  value={user.phonePrefix}
                  onChange={handleChange}
                  className="w-24"
                />
                <button
                  type="button"
                  onClick={() => setIsCustomPrefix(false)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 scale-75 text-gray-400 hover:text-gray-600"
                >
                  <CloseIcon />
                </button>
              </div>
            )}
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={user.phone}
              onChange={handleChange}
            />
          </div>
          <ErrorMessage className="mt-1">
            {validations.getMessage('phonePrefix') ||
              validations.getMessage('phone')}
          </ErrorMessage>
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-secondary-900 text-white dark:bg-secondary-100 dark:text-secondary-950 font-bold py-4 px-6 rounded-full hover:opacity-90 active:scale-95 active:shadow-inner transition-all duration-150 cursor-pointer"
        >
          {translations['checkout.form.submitButton']} {shoppingCart.totalLabel}
        </button>
      </div>
    </form>
  );
};
