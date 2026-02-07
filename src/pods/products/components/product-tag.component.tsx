import { useSuspenseQuery } from '@tanstack/react-query';
import cx from 'clsx';
import React from 'react';
import type * as model from '../products.model';
import { productConfigQueryOptions } from '../products.query';

interface ClassesProps {
  root?: string;
  img?: string;
}

interface Props {
  product: model.Product;
  classes?: ClassesProps;
}

export const ProductTag: React.FC<Props> = (props) => {
  const { product, classes = {} } = props;
  const { data: productConfig } = useSuspenseQuery(productConfigQueryOptions());

  const tag = product.isOutOfStock
    ? Boolean(productConfig?.outOfStockTag?.url)
      ? productConfig.outOfStockTag
      : null
    : Boolean(product.bioTag?.logo?.url)
      ? product.bioTag!.logo
      : null;

  return (
    <>
      (
      {tag?.url && (
        <div
          className={cx(
            'absolute z-10 rounded-md bg-white/90 shadow-sm backdrop-blur-sm transition-transform duration-300 hover:scale-105',
            classes.root
          )}
        >
          <img
            src={tag.url}
            alt={tag.name}
            className={cx('w-auto', classes.img)}
          />
        </div>
      )}
      )
    </>
  );
};
