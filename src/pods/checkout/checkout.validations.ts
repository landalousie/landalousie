import { WebTranslations } from '#pods/translations/api';
import { create, enforce, only, test } from 'vest';
import 'vest/enforce/email';
import type * as model from './checkout.model';

export const suite = (translations: WebTranslations) =>
  create<keyof model.User>((client: model.User, field: keyof model.User) => {
    only(field);

    test('firstName', translations['validations.firstName.required'], () => {
      enforce(client.firstName).isNotEmpty();
    });
    test('lastName', translations['validations.lastName.required'], () => {
      enforce(client.lastName).isNotEmpty();
    });
    test('email', translations['validations.email.required'], () => {
      enforce(client.email).isNotEmpty();
    });
    test('email', translations['validations.email.format'], () => {
      enforce(client.email).isEmail();
    });
    test(
      'phonePrefix',
      translations['validations.phonePrefix.required'],
      () => {
        enforce(client.phonePrefix).isNotEmpty();
      }
    );
    test('phonePrefix', translations['validations.phonePrefix.format'], () => {
      enforce(client.phonePrefix).matches(/^\+\d+$/);
    });
    test('phone', translations['validations.phone.required'], () => {
      enforce(client.phone).isNotEmpty();
    });
    test('phone', translations['validations.phone.format'], () => {
      enforce(client.phone).matches(/^[0-9\s\-]{6,}$/);
    });
  });
