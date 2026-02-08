import { mapToPriceLabel } from '#core/product';
import type * as productListPod from '#pods/products';
import type * as model from './shopping-cart.model';

const mapToShoppingCartProduct = (
  persistedProduct: model.PersistedProduct,
  product: productListPod.Product,
  productConfig: productListPod.ProductConfig
): model.Product => {
  if (!persistedProduct || !product) {
    return null as any;
  }
  const price = product.price * persistedProduct.quantity;
  return {
    ...product,
    calculatedPrice: price,
    calculatedPriceLabel: `${mapToPriceLabel(price)} ${productConfig.currency}`,
    quantity: persistedProduct.quantity,
  };
};

export const mapToShoppingCartProducts = (
  persistedProducts: readonly model.PersistedProduct[],
  allProducts: productListPod.Product[],
  productConfig: productListPod.ProductConfig
): model.Product[] =>
  Array.isArray(persistedProducts) && Array.isArray(allProducts)
    ? persistedProducts
        .map((persistedProduct) =>
          mapToShoppingCartProduct(
            persistedProduct,
            allProducts.find((product) => product.id === persistedProduct.id)!,
            productConfig
          )
        )
        .filter((p) => Boolean(p) && !p.isOutOfStock)
    : [];

export const mapToShoppingCart = (
  products: model.Product[],
  productConfig: productListPod.ProductConfig
): model.ShoppingCart => {
  const total = products?.reduce(
    (total, product) => total + product.calculatedPrice,
    0
  );
  const totalItems =
    products?.reduce((total, product) => total + product.quantity, 0) ?? 0;

  return {
    products: Array.isArray(products) ? products : [],
    totalItems,
    total,
    totalLabel: `${mapToPriceLabel(total)} ${productConfig.currency}`,
    taxesLabel: productConfig.taxesLabel,
  };
};
