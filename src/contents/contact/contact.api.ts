import { contentIsland } from '#core/clients/content-island.client';
import type { Contact } from './contact.api-model';

export const fetchContact = async () =>
  await contentIsland.getContent<Contact>({
    contentType: 'Contact',
  });
