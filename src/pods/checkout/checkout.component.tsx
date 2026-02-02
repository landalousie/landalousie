import { useShoppingCart } from '#pods/shopping-cart/shopping-cart.hooks';
import { translationsQueryOptions } from '#pods/translations/translations.query.ts';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ContactForm } from './components';

export const Checkout = () => {
  const { shoppingCart } = useShoppingCart();
  const { data: translations } = useSuspenseQuery(translationsQueryOptions());

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
        <ContactForm />
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
