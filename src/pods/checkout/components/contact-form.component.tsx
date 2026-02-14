import { ErrorMessage, Input, Label, Select } from '#common/component';
import { useValidations } from '#common/hooks';
import { CloseIcon, SpinnerIcon } from '#common/icons';
import { useShoppingCart } from '#pods/shopping-cart';
import { translationsQueryOptions } from '#pods/translations';
import { useStore } from '@nanostores/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react';
import { useCheckout } from '../api';
import { COUNTRY_PHONE_CODES } from '../checkout.constants';
import { mapToCheckoutProductList } from '../checkout.mappers';
import type * as model from '../checkout.model';
import { customerStore } from '../checkout.stores';
import { suite } from '../checkout.validations';

export const ContactForm = () => {
  const { shoppingCart } = useShoppingCart();
  const customer = useStore(customerStore);
  const { data: translations } = useSuspenseQuery(translationsQueryOptions());
  const validations = useValidations<model.Customer>(suite(translations));
  const { checkout } = useCheckout();

  const isKnownPrefix = React.useMemo(
    () => COUNTRY_PHONE_CODES.some((c) => c.code === customer.phonePrefix),
    [customer.phonePrefix]
  );
  const [isCustomPrefix, setIsCustomPrefix] = React.useState(!isKnownPrefix);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const newValues = { ...customer, [name]: value };
    customerStore.set(newValues);
    validations.validate(newValues, name as keyof model.Customer);
  };

  const handlePrefixSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value === 'custom') {
      setIsCustomPrefix(true);
      const newValues = { ...customer, phonePrefix: '+' };
      customerStore.set(newValues);
    } else {
      handleChange(e);
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (await validations.validate(customer)) {
      checkout.mutate({
        locale: translations.language,
        products: mapToCheckoutProductList(shoppingCart.products),
        customer: {
          name: `${customer.firstName} ${customer.lastName}`,
          email: customer.email,
          phone: `${customer.phonePrefix} ${customer.phone}`,
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <Label className="mb-1" htmlFor="firstName">
            {translations['checkout.form.firstName']}
          </Label>
          <Input
            id="firstName"
            name="firstName"
            value={customer.firstName}
            onChange={handleChange}
          />
          <ErrorMessage className="mt-1">
            {validations.getMessage('firstName')}
          </ErrorMessage>
        </div>

        <div className="flex-1">
          <Label className="mb-1" htmlFor="lastName">
            {translations['checkout.form.lastName']}
          </Label>
          <Input
            id="lastName"
            name="lastName"
            value={customer.lastName}
            onChange={handleChange}
          />
          <ErrorMessage className="mt-1">
            {validations.getMessage('lastName')}
          </ErrorMessage>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <Label className="mb-1" htmlFor="email">
            {translations['checkout.form.email']}
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={customer.email}
            onChange={handleChange}
          />
          <ErrorMessage className="mt-1">
            {validations.getMessage('email')}
          </ErrorMessage>
        </div>
        <div className="flex-1">
          <Label className="mb-1" htmlFor="phone">
            {translations['checkout.form.phone']}
          </Label>
          <div className="flex gap-2">
            {!isCustomPrefix ? (
              <Select
                name="phonePrefix"
                value={customer.phonePrefix}
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
                  value={customer.phonePrefix}
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
              value={customer.phone}
              onChange={handleChange}
            />
          </div>
          <ErrorMessage className="mt-1">
            {validations.getMessage('phonePrefix') ||
              validations.getMessage('phone')}
          </ErrorMessage>
        </div>
      </div>
      <div>
        <button
          type="submit"
          disabled={checkout.isPending}
          className="w-full bg-secondary-900 text-white dark:bg-secondary-100 dark:text-secondary-950 font-bold py-4 px-6 rounded-full hover:opacity-90 not-disabled:active:scale-95 not-disabled:active:shadow-inner transition-all duration-150 cursor-pointer
          disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center justify-center gap-3"
        >
          {checkout.isPending ? (
            <>
              <SpinnerIcon className="text-white" />
              {translations['checkout.form.submitInProgress']}
            </>
          ) : (
            <>
              <span>{translations['checkout.form.submitButton']}</span>
              <span>{shoppingCart.totalLabel}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
