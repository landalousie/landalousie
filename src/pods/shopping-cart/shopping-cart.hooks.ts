import {
  productConfigQueryOptions,
  productListQueryOptions,
} from '#pods/products';
import { useStore } from '@nanostores/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react';
import {
  mapToShoppingCart,
  mapToShoppingCartProducts,
} from './shopping-cart.mappers';
import {
  isOpenDrawer,
  persistedProductListStore,
} from './shopping-cart.stores';

export const useShoppingCart = () => {
  const { data: productConfig } = useSuspenseQuery(productConfigQueryOptions());
  const { data: allProducts } = useSuspenseQuery(
    productListQueryOptions(productConfig)
  );
  const persistedProductList = useStore(persistedProductListStore);

  const products = React.useMemo(
    () =>
      mapToShoppingCartProducts(
        persistedProductList,
        allProducts,
        productConfig
      ),
    [persistedProductList, allProducts, productConfig]
  );

  const add = (id: string) => {
    const currentCart = [...persistedProductListStore.get()];
    const productIndex = currentCart.findIndex((item) => item.id === id);
    if (productIndex !== -1) {
      const product = currentCart[productIndex];
      currentCart[productIndex].quantity =
        product.quantity >= productConfig.maxUnits
          ? product.quantity
          : product.quantity + 1;
    } else {
      currentCart.push({ id, quantity: 1 });
    }
    persistedProductListStore.set(currentCart);
  };

  const subtract = (id: string) => {
    const currentCart = [...persistedProductListStore.get()];
    const productIndex = currentCart.findIndex((item) => item.id === id);
    if (productIndex !== -1 && currentCart[productIndex].quantity > 1) {
      currentCart[productIndex].quantity -= 1;
      persistedProductListStore.set(currentCart);
    }
  };

  const remove = (id: string) => {
    const currentCart = [...persistedProductListStore.get()];
    const updatedCart = currentCart.filter((item) => item.id !== id);
    persistedProductListStore.set(updatedCart);
  };

  const toggleOpen = (value?: boolean) => {
    if (typeof value === 'boolean') {
      isOpenDrawer.set(value);
    } else {
      isOpenDrawer.set(!isOpenDrawer.get());
    }
  };

  const clear = () => {
    persistedProductListStore.set([]);
  };

  return {
    shoppingCart: mapToShoppingCart(products, productConfig),
    add,
    subtract,
    remove,
    clear,
    isOpen: useStore(isOpenDrawer),
    toggleOpen,
  };
};
