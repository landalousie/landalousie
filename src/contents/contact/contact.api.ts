import { contentIsland } from '#core/services/content-island.service';
import type { Contact } from './contact.api-model';

export const fetchContact = async () =>
  await contentIsland.getContent<Contact>({
    contentType: 'Contact',
  });
