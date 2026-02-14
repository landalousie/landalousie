import { OvalShape, RectangleShape } from '#common/shapes';
import { mapNextPickupDate, nextPickupQueryOptions } from '#pods/next-pickup';
import { useSuspenseQuery } from '@tanstack/react-query';
import { marked } from 'marked';
import { callToActionQueryOptions } from './call-to-action.query';

export const CallToAction = () => {
  const { data: nextPickup } = useSuspenseQuery(nextPickupQueryOptions());
  const { data: callToAction } = useSuspenseQuery(callToActionQueryOptions());
  const description = marked(
    mapNextPickupDate(callToAction.description, nextPickup)
  );

  return (
    <section
      className="bg-primary-50 dark:bg-primary-900 relative overflow-clip rounded-4xl p-6 py-8 sm:p-16"
      aria-labelledby="newsletter-heading"
    >
      <div className="relative z-10 flex flex-col items-center justify-center gap-6 text-center">
        <h2
          className="text-tbase-500/90 text-2xl font-semibold"
          id="newsletter-heading"
        >
          {callToAction.title}
        </h2>
        <div
          className="flex flex-col gap-6"
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
      </div>
      <div
        className="text-primary-500/25 dark:text-primary-500/35 absolute top-[-15%] left-[-30%] h-60 w-105 md:top-[-15%] md:left-[-16%]"
        aria-hidden="true"
      >
        <RectangleShape />
      </div>
      <div className="text-primary-500/25 dark:text-primary-500/35 absolute top-[70%] right-[-40%] h-60 w-105 overflow-clip md:top-[50%] md:right-[-22%]">
        <OvalShape />
      </div>
    </section>
  );
};
