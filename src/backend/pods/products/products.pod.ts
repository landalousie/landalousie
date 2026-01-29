import { stripe } from '#core/clients';
import { ENV } from '#core/constants';
import { createServerFn } from '@tanstack/react-start';
import Stripe from 'stripe';
import { z } from 'zod';
import { fetchProducts } from './api';
import type * as model from './products.model';

export const syncProducts = createServerFn({ method: 'POST' }).handler(
  async () => {
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
          images: product.image ? [product.image.url] : [],
          default_price_data: {
            unit_amount: product.price * 100,
            currency: 'EUR',
          },
        });
      } else {
        await stripe.products.update(product.id, {
          name: product.name,
          description: product.shortDescription,
          images: product.image ? [product.image.url] : [],
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
    email: z.string().email(),
    phone: z.string().min(1),
  }),
});
export const checkout = createServerFn({ method: 'POST' })
  .inputValidator((data: model.Checkout) => checkoutSchema.parse(data))
  .handler(async ({ data: checkout }) => {
    const origin = ENV.DEPLOY_URL;
    const line_items = await Promise.all(
      checkout.products.map(async (item) => {
        const product = await stripe.products.retrieve(item.id);

        if (!product.default_price) {
          throw new Error(
            `El producto ${product.name} no tiene precio configurado.`
          );
        }

        return {
          price: product.default_price as string,
          quantity: item.quantity,
        };
      })
    );

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: `${origin}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
      customer_email: checkout.user.email,
      metadata: {
        customer_name: checkout.user.name,
        customer_phone: checkout.user.phone,
      },
    });

    if (!session.url) {
      throw new Error('No se pudo crear la sesión de pago');
    }

    return { url: session.url };
  });
