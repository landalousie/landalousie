import { generateTailwindPalette } from '#emails/common/helpers';
import { SiteConfig } from '#emails/pods/site-config';
import * as email from '@react-email/components';
import React from 'react';
import { RootContext, RootProvider } from './root.context';

interface Props extends React.PropsWithChildren {
  siteConfig?: SiteConfig;
}

export const Root: React.FC<Props> = (props) => {
  const { children, siteConfig } = props;

  return (
    <RootProvider siteConfig={siteConfig}>
      <InnerRoot>{children}</InnerRoot>
    </RootProvider>
  );
};

const InnerRoot: React.FC<React.PropsWithChildren> = (props) => {
  const { children } = props;
  const { siteConfig } = React.use(RootContext);

  return (
    <email.Html lang={siteConfig.language}>
      <email.Tailwind
        config={{
          presets: [email.pixelBasedPreset],
          theme: {
            extend: {
              colors: {
                primary: generateTailwindPalette(siteConfig.primaryColor),
                secondary: generateTailwindPalette(siteConfig.secondaryColor),
                background: '#fdfbf7',
                surface: '#f4efe6',
                text: '#1a1614',
              },
              fontFamily: {
                title: [siteConfig.titleFont.name, 'sans-serif'],
                body: [
                  siteConfig.bodyFont.name,
                  'sans-serif',
                  'Apple Color Emoji',
                  'Segoe UI Emoji',
                ],
              },
              borderRadius: {
                '4xl': '1.75rem',
                '3xl': '1.5rem',
                '2xl': '1.25rem',
              },
            },
          },
        }}
      >
        {children}
      </email.Tailwind>
    </email.Html>
  );
};
