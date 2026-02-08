import type { Product } from '#contents/product';
import type { ProductConfig } from '#contents/product-config';
import type * as emailModel from '#email/core/products/index.ts';
import type { Stripe } from 'stripe';

export const mapToCustomerEmail = (session: Stripe.Checkout.Session): string =>
  session.customer_details?.email ?? session.customer_email ?? '';

export const mapToCustomerName = (session: Stripe.Checkout.Session): string =>
  session.customer_details?.name ?? mapToCustomerEmail(session);

const mapToProductId = (lineItem: Stripe.LineItem): string =>
  lineItem.price?.product.toString() ?? '';

export const mapToProductIds = (lineItems: Stripe.LineItem[]): string[] =>
  Array.isArray(lineItems)
    ? lineItems.map((lineItem) => mapToProductId(lineItem))
    : [];

export const mapToPrice = (price: number): string => (price / 100).toFixed(2);

const mapStripeProductToEmailProduct = (
  lineItem: Stripe.LineItem,
  product: Product | undefined,
  productConfig: ProductConfig
): emailModel.Product => ({
  id: mapToProductId(lineItem),
  name: lineItem.description ?? product?.name ?? '',
  quantity: lineItem.quantity ?? 0,
  priceLabel: `${mapToPrice(lineItem.price?.unit_amount ?? 0)} ${productConfig.priceUnit}`,
  totalPriceLabel: `${mapToPrice(lineItem.amount_total)} ${productConfig.currency}`,
  imageUrl: product?.image?.url ?? '',
});

export const mapStripeProductsToEmailProducts = (
  lineItems: Stripe.LineItem[],
  products: Product[],
  productConfig: ProductConfig
): emailModel.Product[] =>
  Array.isArray(lineItems)
    ? lineItems.map((lineItem) => {
        const productId = mapToProductId(lineItem);
        const product = products.find((p) => p.id === productId);
        return mapStripeProductToEmailProduct(lineItem, product, productConfig);
      })
    : [];
