// @flow
export type ValidationType = 'email' | 'required';
const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validations = {
  email: (s: string) => emailRegex.test(s),
  required: (s: string) => !!s
};

export const validateMerge = (types: Array<ValidationType> = [], value: any) => {
  const errors = types.reduce((acum: any, t: ValidationType) => {
    if (!validations[t](value)) return Object.assign({}, acum, { [t]: true });
    return Object.assign({}, acum);
  }, {});
  return Object.keys(errors).length ? errors : undefined;
};

export const validateSingle = (types: Array<ValidationType> = [], value: any) => {
  for (let i = 0; i < types.length; i += 1) {
    if (!validations[types[i]](value)) return { [types[i]]: true };
  }
  return undefined;
};

