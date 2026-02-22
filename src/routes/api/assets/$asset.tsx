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
          return Response.redirect(decryptedPath, 302);
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
