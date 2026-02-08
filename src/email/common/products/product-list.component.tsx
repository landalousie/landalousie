import { RootContext } from '#email/common/components';
import * as email from '@react-email/components';
import React from 'react';
import { ProductRow } from './product-row.component';
import type * as vm from './products.model';

interface Props {
  products: vm.Product[];
  totalAmount: string;
}

export const ProductList: React.FC<Props> = (props) => {
  const { products, totalAmount } = props;
  const { translations, productConfig } = React.use(RootContext);
  return (
    <>
      <email.Hr className="border-gray-200 my-4" />
      <email.Section className="mt-5">
        {products.map((product) => (
          <ProductRow key={product.id} product={product} />
        ))}
      </email.Section>
      <email.Section>
        <email.Row>
          <email.Column align="right">
            <email.Text className="text-sm text-text/60 mb-1">
              {translations['productList.total']}{' '}
              {productConfig?.taxesLabel || ''}
            </email.Text>
            <email.Text className="text-2xl font-bold text-text m-0">
              {totalAmount}
            </email.Text>
          </email.Column>
        </email.Row>
      </email.Section>
    </>
  );
};
