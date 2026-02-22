import { fetchProducts } from '#contents/product';
import { logger } from '#core/logger';
import { stripe } from '#core/services/stripe.service';
import { createServerFn } from '@tanstack/react-start';
import Stripe from 'stripe';

export const syncProducts = createServerFn({ method: 'POST' }).handler(
  async () => {
    try {
      const products = await fetchProducts();
      const stripeProducts = await stripe.products.list({
        limit: 100,
        expand: ['data.default_price'],
      });

      for (const product of products) {
        const existingProduct = stripeProducts.data.find(
          (p) => p.id === product.id
        );

        if (!existingProduct) {
          await stripe.products.create({
            id: product.id,
            name: product.name,
            description: product.shortDescription,
            images: product.image ? [encodeURI(product.image.url)] : [],
            default_price_data: {
              unit_amount: product.price * 100,
              currency: 'EUR',
            },
          });
        } else {
          await stripe.products.update(product.id, {
            name: product.name,
            description: product.shortDescription,
            images: product.image ? [encodeURI(product.image.url)] : [],
          });
          const currentPrice = existingProduct.default_price as Stripe.Price;
          const newPrice = product.price * 100;
          if (currentPrice.unit_amount !== newPrice) {
            const newStripePrice = await stripe.prices.create({
              product: product.id,
              unit_amount: newPrice,
              currency: 'EUR',
            });

            await stripe.products.update(product.id, {
              default_price: newStripePrice.id,
            });
          }
        }
      }

      logger.info('Products synchronized successfully with Stripe');
    } catch (error) {
      logger.error(
        `Error syncing products with Stripe: ${JSON.stringify(error, null, 2)}`
      );
      throw error;
    }
  }
);
