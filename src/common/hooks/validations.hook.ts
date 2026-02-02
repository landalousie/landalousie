import React from 'react';
import type { Suite } from 'vest';

export type SuiteLike<
  Data = any,
  FieldName extends keyof Data & string = keyof Data & string,
> = Suite<FieldName, string, (data: any, fieldName?: FieldName) => void>;

export type UseValidationsReturnType<
  Data = any,
  FieldName extends keyof Data & string = keyof Data & string,
> = {
  isValid: (fieldName?: FieldName) => boolean;
  isPending: (fieldName?: FieldName) => boolean;
  validate: (data: any, fieldName?: FieldName) => Promise<boolean>;
  getMessage: (fieldName: FieldName) => string | undefined;
  reset: () => void;
};

export const useValidations = <
  Data,
  FieldName extends keyof Data & string = keyof Data & string,
>(
  suite: SuiteLike<Data, FieldName>,
  messages?: Record<string, string>
) => {
  const [validations, setValidations] = React.useState(suite.get());

  const validate = React.useCallback(
    (data: Data, fieldName?: FieldName) => {
      return new Promise<boolean>((resolve) => {
        const res = suite(data, fieldName);
        setValidations(res);

        res.done((result) => {
          setValidations(result);
          resolve(result.isValid());
        });
      });
    },
    [suite]
  );

  const reset = React.useCallback(() => {
    suite.reset();
    setValidations(suite.get());
  }, [suite]);

  return {
    isValid: (fieldName?: FieldName) =>
      (Boolean(fieldName) && !validations.isTested(fieldName as FieldName)) ||
      validations.isPending(fieldName) ||
      validations.isValid(fieldName),
    isPending: validations.isPending,
    validate,
    getMessage: (fieldName: FieldName) => {
      const result = validations.getMessage(fieldName);
      return messages && result ? messages[result] : result;
    },
    reset,
  };
};
