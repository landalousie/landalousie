import { getOrderConfirmation } from '#backend/pods/checkout';
import { OrderConfirmation } from '#pods/order-confirmation';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/order-confirmation')({
  validateSearch: (search) =>
    z.object({ session_id: z.string().optional() }).parse(search),
  beforeLoad: async ({ search }) => {
    const { session_id } = search;

    if (session_id === 'processed') {
      return;
    }

    if (session_id) {
      try {
        await getOrderConfirmation({ data: { sessionId: session_id } });
      } catch {
        throw redirect({ to: '/checkout/cancel' });
      }

      throw redirect({
        to: '/order-confirmation',
        search: { session_id: 'processed' },
        replace: true,
      });
    }
    throw redirect({ to: '/' });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <OrderConfirmation />;
}
