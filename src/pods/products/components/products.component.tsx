import { useSuspenseQuery } from '@tanstack/react-query';
import {
  productConfigQueryOptions,
  productListQueryOptions,
} from '../products.query';
import { ProductCard } from './product-card.component';

export const Products = () => {
  const { data: productConfig } = useSuspenseQuery(productConfigQueryOptions());
  const { data: products } = useSuspenseQuery(
    productListQueryOptions(productConfig)
  );

  return (
    <section className="mx-auto max-w-7xl">
      <ul className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
};
