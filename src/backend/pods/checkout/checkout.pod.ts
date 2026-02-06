import { stripe } from '#core/clients';
import { ENV } from '#core/constants';
import { logger } from '#core/logger';
import { FileRoutesByPath } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import Stripe from 'stripe';
import { z } from 'zod';
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
        customer_email: checkout.customer.email,
        metadata: {
          customerName: checkout.customer.name,
          customerPhone: checkout.customer.phone,
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
      if (session.invoice) {
        const invoiceId =
          typeof session.invoice === 'string'
            ? session.invoice
            : session.invoice.id;
        const invoice = await stripe.invoices.retrieve(invoiceId);

        return {
          invoicePdf: invoice.invoice_pdf,
          invoiceUrl: invoice.hosted_invoice_url,
        };
      }
      return null;
    } catch (error) {
      logger.error(
        `Error processing checkout success for session ${session.id}: ${JSON.stringify(error, null, 2)}`
      );
      throw error;
    }
  });
