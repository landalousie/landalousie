export interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  phonePrefix: string;
  phone: string;
  wantInvoice: boolean;
}

export const createEmptyCustomer = (): Customer => ({
  firstName: '',
  lastName: '',
  email: '',
  phonePrefix: '+33',
  phone: '',
  wantInvoice: false,
});

export interface Product {
  id: string;
  quantity: number;
}
