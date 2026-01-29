export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phonePrefix: string;
  phone: string;
}

export const createEmptyUser = (): User => ({
  firstName: '',
  lastName: '',
  email: '',
  phonePrefix: '+33',
  phone: '',
});
