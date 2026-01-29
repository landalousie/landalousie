import { contentIsland } from '#core/clients';
import { createServerFn } from '@tanstack/react-start';
import type { Contact } from './contact.api-model';

export const fetchContact = createServerFn().handler(
  async () =>
    await contentIsland.getContent<Contact>({
      contentType: 'Contact',
    })
);
