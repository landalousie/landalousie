import { create, enforce, only, test } from 'vest';
import 'vest/enforce/email';
import type * as model from './checkout.model';

export const suite = create<keyof model.User>(
  (client: model.User, field: keyof model.User) => {
    only(field);

    test('name', 'Name is required', () => {
      enforce(client.firstName).isNotEmpty();
    });
    test('surname', 'Surname is required', () => {
      enforce(client.lastName).isNotEmpty();
    });
    test('email', 'Email is required', () => {
      enforce(client.email).isNotEmpty();
    });
    test('email', 'Email is not valid', () => {
      enforce(client.email).isEmail();
    });
    test('phone', 'Phone is required', () => {
      enforce(client.phone).isNotEmpty();
    });
  }
);
