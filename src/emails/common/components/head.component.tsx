import * as email from '@react-email/components';
import React from 'react';
import { RootContext } from './root';

interface Props {
  title: string;
}

// Not all email clients support the web fonts: https://www.caniemail.com/features/css-at-font-face/ so probably it will use the fallback font
export const Head: React.FC<Props> = (props) => {
  const { title } = props;
  const { siteConfig } = React.use(RootContext);

  return (
    <email.Head>
      <title>{title}</title>
      <email.Font
        fontFamily={siteConfig.titleFont.name}
        fallbackFontFamily="sans-serif"
        webFont={{
          url: siteConfig.titleFont.url,
          format: 'woff2',
        }}
        fontWeight={400}
        fontStyle="normal"
      />
      <email.Font
        fontFamily={siteConfig.bodyFont.name}
        fallbackFontFamily="sans-serif"
        webFont={{
          url: siteConfig.bodyFont.url,
          format: 'woff2',
        }}
        fontWeight={400}
        fontStyle="normal"
      />
    </email.Head>
  );
};
