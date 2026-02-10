import * as email from '@react-email/components';
import React from 'react';
import { Head } from './head.component';
import { Header } from './header.component';

interface Props {
  title: string;
  preview: string;
}

export const Body: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const { title, preview, children } = props;

  return (
    <>
      <Head title={title} />
      <email.Preview>{preview}</email.Preview>
      <email.Body className="bg-background font-body">
        <email.Container className="bg-white mx-auto px-12 py-6 mb-16 rounded-2xl border border-gray-200">
          <Header>{title}</Header>
          {children}
        </email.Container>
      </email.Body>
    </>
  );
};
