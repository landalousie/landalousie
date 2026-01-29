import { RectangleShape } from '#common/shapes';
import { useSuspenseQuery } from '@tanstack/react-query';
import { contactQueryOptions } from './contact.query';

export const Contact = () => {
  const { data: contact } = useSuspenseQuery(contactQueryOptions());

  return (
    <section
      className="bg-primary-50 dark:bg-primary-900 relative overflow-clip rounded-2xl p-6 md:w-1/2 lg:w-full"
      aria-labelledby="contact"
    >
      <div className="relative z-10 flex flex-col gap-6">
        <h2 className="font-geist text-tbase-500/80 font-bold" id="contact">
          {contact.title}
        </h2>
        <p className="text-sm leading-[1.3] decoration-[1.4px]">
          {contact.location}
        </p>
      </div>

      <div className="text-primary-500/25 dark:text-primary-500/35 md:220 absolute right-[-75%] bottom-[-25%] h-60 w-150 lg:w-110">
        <RectangleShape />
      </div>
    </section>
  );
};
