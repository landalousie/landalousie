import { ENV } from '#core/constants';
import { createClient } from '@content-island/api-client';

export const contentIsland = createClient({
  accessToken: ENV.CONTENT_ISLAND_ACCESS_TOKEN,
});
