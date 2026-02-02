import { translationsQueryOptions } from '#pods/translations/translations.query.ts';
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react';

export const Footer: React.FC = () => {
  const { data: translations } = useSuspenseQuery(translationsQueryOptions());

  return (
    <footer className="bg-secondary-100 dark:bg-secondary-900 flex w-full flex-col gap-2 px-6 py-8">
      <div className="flex w-full flex-col items-center justify-between gap-6 md:flex-row">
        <p className="font-instrument text-lg text-nowrap">
          {translations['footer.logo-title']}
        </p>
        <p className="text-xs text-nowrap">{translations['footer.copy']}</p>
      </div>
      <p className="text-center text-xs text-nowrap">
        Powered by{' '}
        <a
          href="https://contentisland.net"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary-400 dark:hover:text-primary-700 underline underline-offset-2"
        >
          Content Island
        </a>
      </p>
    </footer>
  );
};
