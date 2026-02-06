import type { Font, SiteConfig } from '#emails/pods/site-config';
import React from 'react';

interface Context {
  siteConfig: SiteConfig;
}

export const RootContext = React.createContext<Context>(
  null as unknown as Context
);

interface Props extends React.PropsWithChildren {
  siteConfig?: SiteConfig;
}

export const RootProvider: React.FC<Props> = (props) => {
  const { children } = props;

  const titleFont: Font = {
    name: props.siteConfig?.titleFont?.name || 'Instrument Sans',
    url:
      props.siteConfig?.titleFont?.url ||
      'https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@300;400;500;600;700;800&display=swap',
  } as Font;
  const bodyFont: Font = {
    name: props.siteConfig?.bodyFont?.name || 'Instrument Sans',
    url:
      props.siteConfig?.bodyFont?.url ||
      'https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@300;400;500;600;700;800&display=swap',
  } as Font;

  const siteConfig: SiteConfig = {
    ...(props.siteConfig || ({} as SiteConfig)),
    language: props.siteConfig?.language || 'fr',
    titleFont,
    bodyFont,
    primaryColor: props.siteConfig?.primaryColor || '#98e1a1',
    secondaryColor: props.siteConfig?.secondaryColor || '#68965a',
  };

  return (
    <RootContext.Provider
      value={{
        siteConfig: {
          ...siteConfig,
        },
      }}
    >
      {children}
    </RootContext.Provider>
  );
};
