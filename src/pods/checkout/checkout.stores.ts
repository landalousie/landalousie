import { persistentAtom } from '@nanostores/persistent';
import type * as model from './checkout.model';
import { createEmptyUser } from './checkout.model';

export const userStore = persistentAtom<model.User>('user', createEmptyUser(), {
  encode: JSON.stringify,
  decode: JSON.parse,
});
