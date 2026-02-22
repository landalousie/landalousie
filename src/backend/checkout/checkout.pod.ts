import { fetchEmailConfig } from '#contents/email-config';
import { fetchProducts } from '#contents/product';
import { fetchProductConfig } from '#contents/product-config';
import { fetchSiteConfig } from '#contents/site-config';
import { ENV } from '#core/constants';
import { logger } from '#core/logger';
import { resend } from '#core/services/resend.service';
import { stripe } from '#core/services/stripe.service';
import {
  getAdminOrderEmail,
  getCheckoutFailedEmail,
  getCustomerOrderEmail,
} from '#email';
import { FileRoutesByPath } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import Stripe from 'stripe';
import { z } from 'zod';
import {
  formatAssetUrl,
  getCustomerURL,
  getFromEmail,
  getInvoiceUrl,
  getPaymentURL,
  getStripeCustomerId,
} from './checkout.helpers';
import {
  mapStripeProductsToEmailProducts,
  mapToCustomerEmail,
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
        billing_address_collection: 'required',
        tax_id_collection: {
          enabled: true,
        },
        invoice_creation: {
          enabled: true,
        },
        customer: customerId,
        customer_update: {
          name: 'auto',
          address: 'auto',
        },
        metadata: {
          customerName: checkout.customer.name,
          phone: checkout.customer.phone,
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

      const siteConfig = await fetchSiteConfig();
      const customerName = mapToCustomerName(session);
      const logoUrl = formatAssetUrl(siteConfig.favicon?.url);
      const totalAmount = `${mapToPrice(session.amount_total ?? 0)} ${productConfig.currency}`;
      const customerEmail = await getCustomerOrderEmail({
        customerName,
        products: emailProducts,
        totalAmount,
        logoUrl,
        invoiceUrl: formatAssetUrl(invoiceUrl),
      });
      const fromEmail = await getFromEmail();
      const customerEmailResponse = await resend.emails.send({
        from: fromEmail,
        to: [
          ENV.IS_PRODUCTION
            ? mapToCustomerEmail(session)
            : ENV.DEVELOP_TO_EMAIL,
        ],
        html: customerEmail.html,
        subject: customerEmail.subject,
      });
      if (customerEmailResponse.error) {
        logger.error(
          `Error sending order confirmation email to customer for session ${session.id}: ${JSON.stringify(customerEmailResponse.error, null, 2)}`
        );
      } else {
        logger.info(
          `Order confirmation email sent for session ${session.id}: ${JSON.stringify(customerEmailResponse.data, null, 2)}`
        );
      }
      const adminEmail = await getAdminOrderEmail({
        customerName,
        customerUrl: formatAssetUrl(getCustomerURL(session)),
        paymentUrl: formatAssetUrl(getPaymentURL(session)),
        products: emailProducts,
        totalAmount,
        logoUrl,
      });
      const emailConfig = await fetchEmailConfig();
      const adminEmailResponse = await resend.emails.send({
        from: fromEmail,
        to: [emailConfig.toAdminEmail],
        html: adminEmail.html,
        subject: adminEmail.subject,
      });
      if (adminEmailResponse.error) {
        logger.error(
          `Error sending order notification email to admin for session ${session.id}: ${JSON.stringify(adminEmailResponse.error, null, 2)}`
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

export const checkoutFailed = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: Stripe.Checkout.Session | Stripe.PaymentIntent) => data
  )
  .handler(async ({ data: session }) => {
    try {
      const siteConfig = await fetchSiteConfig();
      const customerName = mapToCustomerName(session);
      const logoUrl = formatAssetUrl(siteConfig.favicon?.url);
      const checkoutFailedEmail = await getCheckoutFailedEmail({
        customerName,
        customerUrl: formatAssetUrl(getCustomerURL(session)),
        paymentUrl: formatAssetUrl(getPaymentURL(session)),
        logoUrl,
      });
      const fromEmail = await getFromEmail();
      const emailConfig = await fetchEmailConfig();
      const checkoutFailedResponse = await resend.emails.send({
        from: fromEmail,
        to: [emailConfig.toAdminEmail],
        html: checkoutFailedEmail.html,
        subject: checkoutFailedEmail.subject,
      });
      if (checkoutFailedResponse.error) {
        logger.error(
          `Error sending checkout failure email to customer for session ${session.id}: ${JSON.stringify(checkoutFailedResponse.error, null, 2)}`
        );
      } else {
        logger.info(
          `Checkout failure email sent for session ${session.id}: ${JSON.stringify(checkoutFailedResponse.data, null, 2)}`
        );
      }
      return;
    } catch (error) {
      logger.error(
        `Error processing checkout failure for session ${session.id}: ${JSON.stringify(error, null, 2)}`
      );
      throw error;
    }
  });
