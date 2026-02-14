import { useSuspenseQuery } from '@tanstack/react-query';
import { marked } from 'marked';
import { mapNextPickupDate } from './next-pickup.mappers';
import { nextPickupQueryOptions } from './next-pickup.query';

export const NextPickup = () => {
  const { data: nextPickup } = useSuspenseQuery(nextPickupQueryOptions());
  const description = marked(
    mapNextPickupDate(nextPickup.description, nextPickup)
  );

  return (
    <section
      className="bg-secondary-100 dark:bg-secondary-900 relative flex flex-col gap-4 rounded-2xl p-6 md:w-1/2 lg:w-full"
      aria-labelledby="next-pickup-aside-heading"
    >
      <h2
        className="font-geist text-tbase-500/80 font-bold"
        id="next-pickup-aside-heading"
      >
        {nextPickup.title}
      </h2>
      <div className="flex flex-1 flex-col justify-between gap-2">
        <div
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </section>
  );
};
