import { translationsQueryOptions } from '#pods/translations';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import React from 'react';

export const NotFound: React.FC = () => {
  const { data: translations } = useSuspenseQuery(translationsQueryOptions());
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-2 text-center">
      <div
        className="text-primary-500/20 font-title text-[10rem] font-bold leading-none select-none mb-4"
        aria-hidden="true"
      >
        {translations['notFound.emoji']}
      </div>
      <h1 className="text-2xl font-bold">{translations['notFound.title']}</h1>
      <p className="max-w-md text-balance opacity-75">
        {translations['notFound.body']}
      </p>
      <Link
        to="/"
        className="bg-primary-600 hover:bg-primary-700 text-primary-50 mt-6 rounded-full px-6 py-2 font-semibold transition-colors"
      >
        {translations['notFound.link']}
      </Link>
    </div>
  );
};
