import { stripe } from '#core/clients';
import { ENV } from '#core/constants';
import { logger } from '#core/logger';
import { FileRoutesByPath } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';

import Stripe from 'stripe';
import { z } from 'zod';
import { fetchProducts } from './api';
import type * as model from './products.model';

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
      logger.error('Error syncing products with Stripe:', error);
      throw error;
    }
  }
);

const checkoutSchema = z.object({
  products: z.array(
    z.object({
      id: z.string(),
      quantity: z.number().min(1),
    })
  ),
  user: z.object({
    name: z.string().min(1),
    email: z.email(),
    phone: z.string().min(1),
  }),
});

export const checkout = createServerFn({ method: 'POST' })
  .inputValidator((data: model.Checkout) => checkoutSchema.parse(data))
  .handler(async ({ data: checkout }) => {
    try {
      const origin = ENV.SITE_URL;
      const line_items = await Promise.all(
        checkout.products.map(async (item) => {
          const product = await stripe.products.retrieve(item.id);

          if (!product.default_price) {
            throw new Error(
              `The product "${product.name}" does not have a price set.`
            );
          }

          return {
            price: product.default_price as string,
            quantity: item.quantity,
          };
        })
      );

      const successRoute: keyof FileRoutesByPath = '/order-confirmation';
      const cancelRoute: keyof FileRoutesByPath = '/checkout/cancel';
      const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        success_url: `${origin}${successRoute}?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}${cancelRoute}`,
        customer_email: checkout.user.email,
        metadata: {
          customer_name: checkout.user.name,
          customer_phone: checkout.user.phone,
        },
      });

      if (!session.url) {
        throw new Error('Failed to create checkout session URL.');
      }
      // TODO: Enviar email de info
      logger.info('Checkout session created:', session.id);
      return { url: session.url };
    } catch (error) {
      logger.error('Error creating checkout session:', error);
      throw error;
    }
  });

const getOrderConfirmationSchema = z.object({
  sessionId: z.string(),
});

export const getOrderConfirmation = createServerFn({ method: 'GET' })
  .inputValidator((data: { sessionId: string }) =>
    getOrderConfirmationSchema.parse(data)
  )
  .handler(async ({ data: { sessionId } }) => {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      if (session.payment_status !== 'paid') {
        throw new Error('The payment for this session is not completed.');
      }
      logger.info('Order confirmed for session:', sessionId);

      return;
    } catch (error) {
      logger.error('Error fetching order confirmation:', error);
      throw error;
    }
  });
