import { contactQueryOptions } from '#pods/contact';
import { nextPickupQueryOptions } from '#pods/next-pickup';
import {
  productConfigQueryOptions,
  productListQueryOptions,
} from '#pods/products';
import { CartButton, CartDrawer } from '#pods/shopping-cart';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_shop')({
  loader: async ({ context }) => {
    const productConfig = await context.queryClient.ensureQueryData(
      productConfigQueryOptions()
    );
    return {
      products: await context.queryClient.ensureQueryData(
        productListQueryOptions(productConfig)
      ),
      productConfig,
      nextPickup: await context.queryClient.ensureQueryData(
        nextPickupQueryOptions()
      ),
      contact: await context.queryClient.ensureQueryData(contactQueryOptions()),
    };
  },
  component: Component,
});

function Component() {
  return (
    <>
      <CartButton />
      <CartDrawer />
      <Outlet />
    </>
  );
}
