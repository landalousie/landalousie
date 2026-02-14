import { symmetricEncrypt } from '#common/helpers';
import { stripe } from '#core/clients/stripe.client';
import { ENV } from '#core/constants';
import { FileRoutesByPath } from '@tanstack/react-router';
import type { Stripe } from 'stripe';
import type * as model from './checkout.model';

export const getStripeCustomerId = async (
  customer: model.Customer
): Promise<string> => {
  const existing = await stripe.customers.list({
    email: customer.email,
    limit: 1,
  });

  if (existing.data.length > 0) {
    const stripeCustomer = existing.data[0];

    await stripe.customers.update(stripeCustomer.id, {
      name: customer.name,
      phone: customer.phone,
    });
    return stripeCustomer.id;
  }
  const newCustomer = await stripe.customers.create({
    email: customer.email,
    name: customer.name,
    phone: customer.phone,
  });
  return newCustomer.id;
};

export const getInvoiceUrl = async (
  sessionInvoice: string | Stripe.Invoice | null
): Promise<string> => {
  if (!sessionInvoice) {
    return '';
  }

  const invoiceId =
    typeof sessionInvoice === 'string' ? sessionInvoice : sessionInvoice.id;
  const invoice = await stripe.invoices.retrieve(invoiceId);
  return invoice.invoice_pdf ?? invoice.hosted_invoice_url ?? '';
};

export const getPaymentURL = (session: Stripe.Checkout.Session): string => {
  const envPrefix = session.livemode ? '' : 'test/';
  return `https://dashboard.stripe.com/${envPrefix}payments/${session.payment_intent}`;
};

export const getCustomerURL = (session: Stripe.Checkout.Session): string => {
  const envPrefix = session.livemode ? '' : 'test/';
  return `https://dashboard.stripe.com/${envPrefix}customers/${session.customer}`;
};

const ASSETS_BASE_URL: keyof FileRoutesByPath = '/api/assets/$asset';

export const formatAssetUrl = (url: string | undefined): string => {
  if (!url) {
    return '';
  }

  return `${ENV.SITE_URL}${ASSETS_BASE_URL.replace('$asset', symmetricEncrypt(url, ENV.ENCRYPT_ASSETS_TOKEN))}`;
};
