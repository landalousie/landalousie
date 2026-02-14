import { syncProducts } from '#backend/products';
import { ENV } from '#core/constants';
import { logger } from '#core/logger';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/api/products/')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const authHeader = request.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          logger.warn('Unauthorized access attempt to sync products');
          return new Response('Unauthorized', { status: 401 });
        }
        const token = authHeader.split(' ')[1];
        if (token !== ENV.CONTENT_ISLAND_ACCESS_TOKEN) {
          logger.warn('Invalid token provided for syncing products');
          return new Response('Unauthorized', { status: 401 });
        }

        logger.info('Starting product synchronization');
        await syncProducts();
        return new Response(null, { status: 204 });
      },
    },
  },
});
