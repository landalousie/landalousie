import { persistentAtom } from '@nanostores/persistent';
import { atom } from 'nanostores';
import type * as model from './shopping-cart.model';

export const persistedProductListStore = persistentAtom<
  model.PersistedProduct[]
>('cart', [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const isOpenDrawer = atom<boolean>(false);
