import { ENV } from '#core/constants';
import Stripe from 'stripe';

export const stripe = new Stripe(ENV.STRIPE_API_KEY, {
  apiVersion: '2026-01-28.clover',
});
