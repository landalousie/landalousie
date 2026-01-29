import { ShoppingCartIcon } from '#common/icons';
import { translationsQueryOptions } from '#pods/translations/translations.query.ts';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ClientOnly } from '@tanstack/react-router';
import cx from 'clsx';
import { MIN_QUANTITY } from '../shopping-cart.constants';
import { useShoppingCart } from '../shopping-cart.hooks';

export const CartButton = () => {
  const { shoppingCart, toggleOpen } = useShoppingCart();
  const { data: translations } = useSuspenseQuery(translationsQueryOptions());

  return (
    <button
      className="bg-primary-600 focus:ring-primary-600 dark:bg-primary-500 dark:hover:bg-primary-400 fixed top-24 right-4 z-40 flex cursor-pointer items-center justify-center rounded-full p-3 text-white shadow-lg transition-transform hover:scale-110 focus:ring-2 focus:ring-offset-2 focus:outline-none"
      aria-label={translations['shopping-cart.cart-button.a11y.open-button']}
      onClick={() => toggleOpen()}
    >
      <ShoppingCartIcon />
      <ClientOnly fallback={<Badge count={MIN_QUANTITY} />}>
        <Badge count={shoppingCart.totalItems} />
      </ClientOnly>
    </button>
  );
};

interface BadgeProps {
  count: number;
}

const Badge: React.FC<BadgeProps> = (props) => {
  const { count } = props;
  return (
    <span
      className={cx(
        `absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white transition-opacity`,
        {
          'opacity-100': count > MIN_QUANTITY,
          'opacity-0': count === MIN_QUANTITY,
        }
      )}
    >
      {count}
    </span>
  );
};
