export const mapProductNameToSlug = (name: string): string =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const mapToPriceLabel = (price: number): string => price.toFixed(2);
