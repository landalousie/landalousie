import { RootContext } from '#email/common/components';
import * as email from '@react-email/components';
import React from 'react';
import type * as vm from './products.model';

interface Props {
  product: vm.Product;
}

export const ProductRow: React.FC<Props> = (props) => {
  const { product } = props;
  const { translations } = React.use(RootContext);
  return (
    <email.Row
      key={product.id}
      className="mb-5 border-b border-gray-200 pb-2.5"
    >
      <email.Column className="w-16 align-top">
        <email.Img
          src={product.imageUrl}
          width="64"
          height="64"
          alt={product.name}
          className="rounded-lg object-cover"
        />
      </email.Column>
      <email.Column className="pl-4 align-top">
        <email.Text className="text-base font-semibold text-text mt-0 mb-1">
          {product.name}
        </email.Text>
        <email.Text className="text-sm text-text/60 m-0">
          {translations['productList.quantity']}: {product.quantity} x{' '}
          {product.priceLabel}
        </email.Text>
      </email.Column>
      <email.Column className="text-right align-top">
        <email.Text className="text-base font-semibold text-text m-0">
          {product.totalPriceLabel}
        </email.Text>
      </email.Column>
    </email.Row>
  );
};
