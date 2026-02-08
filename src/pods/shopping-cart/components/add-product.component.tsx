import { AddIcon, SubtractIcon } from '#common/icons';
import { translationsQueryOptions } from '#pods/translations';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ClientOnly } from '@tanstack/react-router';
import cx from 'clsx';
import React from 'react';
import { MIN_QUANTITY } from '../shopping-cart.constants';
import { useShoppingCart } from '../shopping-cart.hooks';

interface Props {
  productId: string;
  canRemove?: boolean;
  className?: string;
}

export const AddProduct: React.FC<Props> = (props) => {
  const { productId, canRemove = false, className } = props;
  const { shoppingCart, add, subtract, remove } = useShoppingCart();
  const product = React.useMemo(
    () => shoppingCart.products.find((product) => product.id === productId),
    [shoppingCart.products, productId]
  );
  const { data: translations } = useSuspenseQuery(translationsQueryOptions());

  const handleSubtract = () => {
    const quantity = product?.quantity ?? MIN_QUANTITY;
    if (quantity <= 1 && canRemove) {
      remove(props.productId);
    } else {
      subtract(props.productId);
    }
  };

  return (
    <div className={cx('mt-auto', className)}>
      <div className="hover:border-primary-100 dark:hover:border-primary-900 flex w-full items-center justify-between rounded-lg border border-gray-100 bg-white p-1 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <button
          className="hover:text-primary-600 focus:ring-primary-500/20 dark:hover:text-primary-400 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-all hover:bg-gray-50 focus:ring-2 focus:outline-none active:scale-95 dark:text-gray-500 dark:hover:bg-gray-700"
          aria-label={
            translations['shoppingCart.addProduct.a11y.subtractButton']
          }
          onClick={handleSubtract}
        >
          <SubtractIcon />
        </button>

        <ClientOnly fallback={<Quantity quantity={MIN_QUANTITY} />}>
          <Quantity quantity={product?.quantity ?? MIN_QUANTITY} />
        </ClientOnly>

        <button
          className="bg-primary-50 text-primary-600 focus:ring-primary-500/20 dark:bg-primary-900/20 dark:text-primary-400 flex h-8 w-8 items-center justify-center rounded-full transition-all hover:shadow-sm focus:ring-2 focus:outline-none active:scale-95"
          aria-label={translations['shoppingCart.addProduct.a11y.addButton']}
          onClick={() => add(props.productId)}
        >
          <AddIcon />
        </button>
      </div>
    </div>
  );
};

interface QuantityProps {
  quantity: number;
}

const Quantity: React.FC<QuantityProps> = (props) => {
  const { quantity: count } = props;
  return (
    <span className="w-12 text-center text-base font-bold text-gray-900 dark:text-white">
      {count}
    </span>
  );
};
