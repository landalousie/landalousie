import { symmetricDecrypt } from '#common/helpers';
import { ENV } from '#core/constants';
import { logger } from '#core/logger';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/api/assets/$asset')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          const decryptedPath = symmetricDecrypt(
            params.asset,
            ENV.ENCRYPT_ASSETS_TOKEN
          );
          const response = await fetch(decryptedPath);
          logger.info(JSON.stringify({ response }, null, 2));
          if (!response.ok) {
            logger.error(
              `Failed to fetch asset from ${decryptedPath}: ${response.statusText}`
            );
            return new Response('Failed to fetch the asset', { status: 500 });
          }
          const contentType =
            response.headers.get('Content-Type') || 'application/octet-stream';
          return new Response(response.body, {
            headers: {
              'Content-Type': contentType,
              'Content-Disposition':
                response.headers.get('Content-Disposition') || 'inline',
            },
          });
        } catch (error) {
          logger.error(
            `Error processing asset request: ${(error as Error).message}`
          );
          return new Response('Invalid asset path', { status: 400 });
        }
      },
    },
  },
});
