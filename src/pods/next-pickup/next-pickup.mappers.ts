import type { NextPickup } from './api/next-pickup.api-model';

export const mapNextPickupDescription = (
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
