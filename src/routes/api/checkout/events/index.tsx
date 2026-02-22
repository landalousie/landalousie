import { checkoutFailed, checkoutSuccess } from '#backend/checkout';
import { ENV, STRIPE_SIGNATURE_HEADER } from '#core/constants';
import { logger } from '#core/logger';
import { stripe } from '#core/services/stripe.service';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/api/checkout/events/')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const rawBody = await request.text();
          const event = await stripe.webhooks.constructEventAsync(
            rawBody,
            request.headers.get(STRIPE_SIGNATURE_HEADER) || '',
            ENV.STRIPE_WEBHOOK_SECRET
          );

          switch (event.type) {
            case 'checkout.session.completed': {
              const session = event.data.object;
              await checkoutSuccess({ data: session });
              break;
            }
            case 'checkout.session.expired':
            case 'payment_intent.payment_failed':
            case 'checkout.session.async_payment_failed': {
              const session = event.data.object;
              await checkoutFailed({ data: session });
              break;
            }
          }

          return new Response(null, { status: 204 });
        } catch (error) {
          logger.error(`Stripe webhook Error: ${(error as Error).message}`);
          return new Response('Cannot process the checkout session', {
            status: 400,
          });
        }
      },
    },
  },
});
