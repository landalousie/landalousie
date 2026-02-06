import * as email from '@react-email/components';
import { ProductRow } from './product-row.component';
import type * as vm from './products.model';

interface Props {
  products: vm.Product[];
  className?: string;
}

export const ProductList: React.FC<Props> = (props) => {
  const { products, className } = props;
  return (
    <email.Section className={className}>
      {products.map((product) => (
        <ProductRow key={product.id} product={product} />
      ))}
    </email.Section>
  );
};
