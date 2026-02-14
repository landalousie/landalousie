import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/checkout/')({
  component: RouteComponent,
});

// To avoid error on prerender: crawlLinks: true
function RouteComponent() {
  return <Outlet />;
}
