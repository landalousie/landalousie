import { WarningIcon } from '#common/icons';
import { translationsQueryOptions } from '#pods/translations';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/checkout/cancel')({
  component: Component,
});

function Component() {
  const { data: translations } = useSuspenseQuery(translationsQueryOptions());
  return (
    <div className="flex justify-center p-4">
      <div className="max-w-md w-full bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-400 dark:border-yellow-600 rounded-lg p-8 shadow-lg">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-yellow-400 dark:bg-yellow-600 rounded-full p-3">
            <WarningIcon />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-yellow-900 dark:text-yellow-100 mb-4">
          {translations['checkout.cancel']}
        </h2>
      </div>
    </div>
  );
}
