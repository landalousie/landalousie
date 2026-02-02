import { Footer, Header } from '#common/component';
import { getThemeScript } from '#core/theme';
import { CallToAction, callToActionQueryOptions } from '#pods/call-to-action';
import { pageQueryOptions } from '#pods/page';
import { siteConfigQueryOptions } from '#pods/site-config/';
import { translationsQueryOptions } from '#pods/translations';
import emojiFont from '@fontsource/noto-color-emoji/emoji.css?url';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { useSuspenseQuery, type QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import {
  createRootRouteWithContext,
  HeadContent,
  ScriptOnce,
  Scripts,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import appCss from '../styles.css?url';

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    loader: async ({ context }) => ({
      siteConfig: await context.queryClient.ensureQueryData(
        siteConfigQueryOptions()
      ),
      homePage: await context.queryClient.ensureQueryData(
        pageQueryOptions('home')
      ),
      translations: await context.queryClient.ensureQueryData(
        translationsQueryOptions()
      ),
      callToAction: await context.queryClient.ensureQueryData(
        callToActionQueryOptions()
      ),
    }),
    head: ({ loaderData }) => ({
      meta: [
        {
          charSet: 'utf-8',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          title: loaderData?.homePage?.title,
        },
        {
          name: 'description',
          content: loaderData?.homePage?.description,
        },
      ],
      links: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: loaderData?.siteConfig?.favicon.url,
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossOrigin: 'anonymous',
        },
        {
          rel: 'stylesheet',
          href: loaderData?.siteConfig?.titleFont.url,
        },
        {
          rel: 'stylesheet',
          href: loaderData?.siteConfig?.bodyFont.url,
        },
        {
          rel: 'stylesheet',
          href: emojiFont,
        },
        {
          rel: 'stylesheet',
          href: appCss,
        },
      ],
    }),
    shellComponent: RootDocument,
  }
);

function RootDocument({ children }: { children: React.ReactNode }) {
  const { data: siteConfig } = useSuspenseQuery(siteConfigQueryOptions());

  const themeVariables = {
    '--color-primary': siteConfig.primaryColor,
    '--color-secondary': siteConfig.secondaryColor,
    '--font-name-title': siteConfig.titleFont.name,
    '--font-name-body': siteConfig.bodyFont.name,
  } as React.CSSProperties;

  return (
    <html lang={siteConfig?.language} style={themeVariables}>
      <head>
        <HeadContent />
        <ScriptOnce children={getThemeScript()} />
      </head>
      <body className="dark:bg-primary-950 text-tbase-500/75 flex flex-col">
        <Header />
        <main className="mx-auto flex w-full max-w-400 flex-col gap-10 px-4 pt-6 pb-14 md:px-8 lg:px-14">
          {children}
          <CallToAction />
        </main>
        <Footer />
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            {
              name: 'React Query',
              render: <ReactQueryDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
