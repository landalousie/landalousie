import { Hero } from '#common/component';
import { ShopLayout } from '#layouts';
import { pageQueryOptions } from '#pods/page';
import { Products } from '#pods/products';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_shop/')({
  component: Component,
});

function Component() {
  const { data: homePage } = useSuspenseQuery(pageQueryOptions('home'));

  return (
    <ShopLayout
      hero={
        <Hero ariaLabelledby="hero-title">
          <div className="flex flex-col gap-2 text-center">
            <h2
              className="text-primary-700 dark:text-primary-200 text-5xl font-bold"
              id="hero-title"
            >
              {homePage.heroTitle}
            </h2>
            <p className="m-auto max-w-[30ch] text-lg leading-[1.2] tracking-normal">
              {homePage.heroDescription}
            </p>
          </div>
        </Hero>
      }
    >
      <Products />
    </ShopLayout>
  );
}
