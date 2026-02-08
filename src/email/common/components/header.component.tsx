import * as email from '@react-email/components';
import React from 'react';
import { RootContext } from './root';

export const Header: React.FC<React.PropsWithChildren> = (props) => {
  const { children } = props;
  const { logoUrl } = React.use(RootContext);
  return (
    <email.Row>
      <email.Column align="center">
        <email.Heading as="h1">
          {logoUrl && (
            <email.Img
              style={{
                marginBottom: '0.5rem',
                maxWidth: '450px',
                width: '100%',
              }}
              src={logoUrl}
              alt="L'Andalousie logo"
            />
          )}
          {children}
        </email.Heading>
      </email.Column>
    </email.Row>
  );
};
