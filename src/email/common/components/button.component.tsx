import * as email from '@react-email/components';
import cx from 'clsx';
import React from 'react';

interface Props extends email.ButtonProps {
  variant?: 'primary' | 'secondary';
  align?: email.ColumnProps['align'];
}

export const Button: React.FC<Props> = (props) => {
  const { variant = 'secondary', align = 'center', className, ...rest } = props;

  const variantClasses = {
    primary: 'bg-primary text-white hover:opacity-90 transition-opacity',
    secondary: 'bg-secondary text-white hover:opacity-90 transition-opacity',
  };

  return (
    <email.Row>
      <email.Column align={align}>
        <email.Button
          {...rest}
          className={cx(
            variantClasses[variant],
            'rounded-lg px-6 py-3 font-semibold text-center min-w-62 box-border',
            className
          )}
        />
      </email.Column>
    </email.Row>
  );
};
