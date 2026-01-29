import { OrderConfirmation } from '#pods/order-confirmation/order-confirmation.component.tsx';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/order-confirmation')({
  component: RouteComponent,
});

function RouteComponent() {
  return <OrderConfirmation />;
}
