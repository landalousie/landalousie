import { MoonIcon, SunIcon } from '#common/icons';
import { useTheme } from '#core/theme';
import { translationsQueryOptions } from '#pods/translations';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import React from 'react';

export const Header: React.FC = () => {
  const { data: translations } = useSuspenseQuery(translationsQueryOptions());
  const { theme, toggle } = useTheme();
  return (
    <header className="bg-secondary-100 dark:bg-secondary-900 text-tbase-500/90 sticky top-0 z-50 flex w-full items-center justify-between px-4 py-4 shadow-sm backdrop-blur-md md:px-6">
      <div className="font-instrument text-center text-lg md:text-xl font-bold text-nowrap">
        <Link
          to="/"
          className="hover:text-primary-500 dark:hover:text-primary-300 transition-colors"
        >
          <h1>
            <span>{translations['header.logoTitle']}</span>
            <span className="sr-only">
              {translations['header.a11y.titleLinkLabel']}
            </span>
          </h1>
        </Link>
      </div>

      <nav
        className="flex items-center gap-3 md:gap-8"
        aria-label="Main navigation"
      >
        <Link
          to="/about"
          className="font-geist hover:text-primary-500 dark:hover:text-primary-300 font-semibold transition-colors text-sm md:text-base"
        >
          {translations['header.about.link']}
        </Link>

        <button
          className="bg-primary-50 dark:bg-primary-800 hover:bg-primary-100 dark:hover:bg-primary-600 relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-colors duration-300 hover:shadow-lg"
          onClick={() => toggle()}
        >
          <span className="sr-only">
            {translations['header.a11y.themeButton']}
          </span>
          <div className="relative h-6 w-6 overflow-hidden">
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </div>
        </button>
      </nav>
    </header>
  );
};
