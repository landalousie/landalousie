export interface Product {
  id: string;
  quantity: number;
}

export interface User {
  name: string;
  email: string;
  phone: string;
}

export interface Checkout {
  products: Product[];
  user: User;
}
