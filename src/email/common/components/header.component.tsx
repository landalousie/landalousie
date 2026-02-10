import * as email from '@react-email/components';
import React from 'react';
import { RootContext } from './root';

export const Header: React.FC<React.PropsWithChildren> = (props) => {
  const { children } = props;
  const { logoUrl } = React.use(RootContext);
  return (
    <email.Row>
      <email.Column align="center">
        <email.Heading as="h1" className="mt-0">
          {logoUrl && (
            <email.Img
              src={logoUrl}
              alt="L'Andalousie logo"
              width="160"
              className="block mx-auto mb-3 max-w-30 w-full h-auto object-contain rounded-lg border border-gray-200"
            />
          )}
          {children}
        </email.Heading>
      </email.Column>
    </email.Row>
  );
};
