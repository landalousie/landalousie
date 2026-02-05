import { stripe } from '#core/clients';
import { ENV, STRIPE_SIGNATURE_HEADER } from '#core/constants';
import { logger } from '#core/logger';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/checkout/events')({
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
              logger.info(`Pago exitoso para la sesión: ${session.id}`);
              // TODO: Enviar email de confirmación aquí
              // const email = session.customer_details?.email;
              break;
            }
            case 'checkout.session.async_payment_failed': {
              const session = event.data.object;
              logger.error(`El pago falló para la sesión: ${session.id}`);
              break;
            }
            case 'checkout.session.expired': {
              const session = event.data.object;
              logger.info(
                `Sesión de checkout expirada/abandonada: ${session.id}`
              );
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
