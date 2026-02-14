import type { NextPickup } from '#contents/next-pickup';

export const mapNextPickupDate = (
  description: string,
  nextPickup: NextPickup
): string =>
  description.replace(
    '{{nextPickupDate}}',
    new Date(nextPickup.dateTime).toLocaleDateString(nextPickup.language, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  );
