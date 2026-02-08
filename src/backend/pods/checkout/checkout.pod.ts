import { fetchProducts } from '#contents/product';
import { fetchProductConfig } from '#contents/product-config';
import { resend } from '#core/clients/resend.client';
import { stripe } from '#core/clients/stripe.client';
import { ENV } from '#core/constants';
import { logger } from '#core/logger';
import { getCustomerOrderEmail } from '#email/index.ts';
import { FileRoutesByPath } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import Stripe from 'stripe';
import { z } from 'zod';
import { getInvoiceUrl, getStripeCustomerId } from './checkout.helpers';
import {
  mapStripeProductsToEmailProducts,
  mapToCustomerName,
  mapToPrice,
  mapToProductIds,
} from './checkout.mappers';
import * as model from './checkout.model';

export const checkout = createServerFn({ method: 'POST' })
  .inputValidator((data: model.Checkout) => model.checkoutSchema.parse(data))
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
      const customerId = await getStripeCustomerId(checkout.customer);

      const successRoute: keyof FileRoutesByPath = '/order-confirmation';
      const cancelRoute: keyof FileRoutesByPath = '/checkout/cancel';
      const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        success_url: `${origin}${successRoute}?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}${cancelRoute}`,
        locale: checkout.locale as any,
        billing_address_collection: checkout.customer.wantInvoice
          ? 'required'
          : 'auto',
        tax_id_collection: {
          enabled: checkout.customer.wantInvoice,
        },
        invoice_creation: {
          enabled: checkout.customer.wantInvoice,
        },
        customer: customerId,
        customer_update: {
          name: 'auto',
        },
        metadata: {
          wantInvoiceString: checkout.customer.wantInvoice.toString(),
        },
      });

      if (!session.url) {
        throw new Error('Failed to create checkout session URL.');
      }
      // TODO: Enviar email de info
      logger.info(`Checkout session created: ${session.id}`);
      return { url: session.url };
    } catch (error) {
      logger.error(
        `Error creating checkout session: ${JSON.stringify(error, null, 2)}`
      );
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
      logger.info(`Order confirmed for session: ${sessionId}`);

      return;
    } catch (error) {
      logger.error(
        `Error fetching order confirmation:: ${JSON.stringify(error, null, 2)}`
      );
      throw error;
    }
  });

export const checkoutSuccess = createServerFn({ method: 'POST' })
  .inputValidator((data: Stripe.Checkout.Session) => data)
  .handler(async ({ data: session }) => {
    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id,
        { limit: 100 }
      );
      const productIds = mapToProductIds(lineItems.data);
      const products = await fetchProducts({ id: { in: productIds } });
      const productConfig = await fetchProductConfig();
      const emailProducts = mapStripeProductsToEmailProducts(
        lineItems.data,
        products,
        productConfig
      );
      const invoiceUrl = await getInvoiceUrl(session.invoice);
      const { html, subject } = await getCustomerOrderEmail({
        customerName: mapToCustomerName(session),
        products: emailProducts,
        totalAmount: `${mapToPrice(session.amount_total ?? 0)} ${productConfig.currency}`,
        invoiceUrl,
      });
      const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: ['delivered@resend.dev'],
        html,
        subject,
      });
      if (error) {
        logger.error(
          `Error sending order confirmation email for session ${session.id}: ${JSON.stringify(error, null, 2)}`
        );
      } else {
        logger.info(
          `Order confirmation email sent for session ${session.id}: ${JSON.stringify(data, null, 2)}`
        );
      }
      return;
    } catch (error) {
      logger.error(
        `Error processing checkout success for session ${session.id}: ${JSON.stringify(error, null, 2)}`
      );
      throw error;
    }
  });
