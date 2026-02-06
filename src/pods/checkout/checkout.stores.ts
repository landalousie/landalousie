import { persistentAtom } from '@nanostores/persistent';
import type * as model from './checkout.model';
import { createEmptyCustomer } from './checkout.model';

export const customerStore = persistentAtom<model.Customer>(
  'customer',
  createEmptyCustomer(),
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);
