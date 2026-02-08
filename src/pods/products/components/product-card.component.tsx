import { mapProductNameToSlug } from '#core/product';
import { AddProduct } from '#pods/shopping-cart';
import { Link } from '@tanstack/react-router';
import React from 'react';
import type * as model from '../products.model';
import { ProductTag } from './product-tag.component';

interface Props {
  product: model.Product;
}

export const ProductCard: React.FC<Props> = (props) => {
  const { product } = props;
  const slug = mapProductNameToSlug(product.name);

  return (
    <article className="group bg-surface relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link
        className="relative block aspect-square w-full overflow-hidden bg-gray-50"
        to="/products/$slug"
        params={{ slug }}
        search={{ id: product.id }}
      >
        <img
          src={product.image.url}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />

        <ProductTag
          classes={{
            root: 'top-3 left-3 p-1',
            img: 'h-6',
          }}
          product={product}
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3
          className="mb-2 line-clamp-2 h-14 text-lg leading-tight font-bold text-gray-900 dark:text-gray-100"
          title={product.name}
        >
          <Link
            to="/products/$slug"
            params={{ slug }}
            search={{ id: product.id }}
            className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            {product.name}
          </Link>
        </h3>

        <div className="mb-3 flex items-center gap-2">
          <span className="text-primary-600 dark:text-primary-400 text-xl font-extrabold">
            {product.priceLabel}
          </span>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {product.priceUnit}
          </span>
        </div>

        <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          {product.shortDescription}
        </p>
        {!product.isOutOfStock && (
          <div className="mt-auto">
            <AddProduct productId={product.id} canRemove />
          </div>
        )}
      </div>
    </article>
  );
};
