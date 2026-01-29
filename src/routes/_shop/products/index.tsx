import { syncProducts } from '#backend/pods/products';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_shop/products/')({
  server: {
    handlers: {
      POST: async () => {
        await syncProducts();
        return new Response(null, { status: 204 });
      },
    },
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_shop/products/"!</div>;
}
