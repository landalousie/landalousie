export interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  phonePrefix: string;
  phone: string;
  billingAddress: string;
}

export const createEmptyCustomer = (): Customer => ({
  firstName: '',
  lastName: '',
  email: '',
  phonePrefix: '+33',
  phone: '',
  billingAddress: '',
});

export interface Product {
  id: string;
  quantity: number;
}
