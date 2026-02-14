import { Hero } from '#common/component';
import { ArrowLeftIcon } from '#common/icons';
import { pageQueryOptions } from '#pods/page';
import { translationsQueryOptions } from '#pods/translations';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { marked } from 'marked';

export const Route = createFileRoute('/about')({
  loader: async ({ context }) => ({
    aboutPage: await context.queryClient.ensureQueryData(
      pageQueryOptions('about')
    ),
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { data: aboutPage } = useSuspenseQuery(pageQueryOptions('about'));
  const { data: translations } = useSuspenseQuery(translationsQueryOptions());
  const content = marked(aboutPage.content || '');

  return (
    <>
      <Link
        to="/"
        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900"
      >
        <ArrowLeftIcon />
        {translations['page.navigateBack']}
      </Link>
      <Hero ariaLabelledby="hero-title">
        <div className="flex flex-col gap-2 text-center">
          <h2
            className="text-primary-700 dark:text-primary-200 text-5xl font-bold"
            id="hero-title"
          >
            {aboutPage.heroTitle}
          </h2>
          <p className="m-auto max-w-[30ch] text-lg leading-[1.2] tracking-normal">
            {aboutPage.heroDescription}
          </p>
        </div>
      </Hero>
      <div
        className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:text-primary-800 dark:prose-headings:text-primary-100 prose-a:text-primary-700 hover:prose-a:text-primary-900 dark:prose-a:text-primary-300 prose-blockquote:border-l-4 prose-blockquote:border-primary-500 prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:not-italic dark:prose-blockquote:bg-white/5 prose-li:marker:text-primary-600 dark:prose-li:marker:text-primary-400 prose-img:rounded-xl prose-img:shadow-lg mx-auto mt-12 max-w-3xl px-4"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </>
  );
}
