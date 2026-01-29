import { NextPickup, nextPickupQueryOptions } from '#pods/next-pickup';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { CheckCircle } from 'lucide-react';

export const OrderConfirmation = () => {
  // Prefetch data just in case, though NextPickup component handles it too
  // We use this to get the title if needed for the page header
  const { data: nextPickup } = useSuspenseQuery(nextPickupQueryOptions());

  return (
    <div
      className="flex flex-col items-center gap-10 py-10"
      aria-labelledby="confirmation-heading"
    >
      <div className="flex flex-col items-center gap-4 text-center animate-in fade-in zoom-in duration-500">
        <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full text-green-600 dark:text-green-400">
          <CheckCircle size={64} strokeWidth={1.5} />
        </div>
        <h2
          id="confirmation-heading"
          className="text-3xl md:text-4xl font-bold font-geist text-tbase-500"
        >
          Order Confirmed!
        </h2>
        <p className="text-tbase-500/80 max-w-md">
          Thank you for your order. We've sent a confirmation email with your
          order details.
        </p>
      </div>

      <div className="w-full max-w-2xl flex flex-col gap-8">
        {/* Next Pickup Reminder */}
        <div className="w-full">
          <h3 className="text-xl font-bold mb-4 font-geist text-tbase-500">
            Important Pickup Info
          </h3>
          <NextPickup />
        </div>

        <div className="flex justify-center">
          <Link
            to="/"
            className="bg-primary-900 text-primary-50 dark:bg-primary-50 dark:text-primary-950 font-bold py-3 px-8 rounded-full hover:opacity-90 transition-opacity"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};
