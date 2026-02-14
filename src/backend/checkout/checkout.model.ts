import { LanguageCode } from '@content-island/api-client';
import { z } from 'zod';

const productSchema = z.object({
  id: z.string(),
  quantity: z.number().min(1),
});

export type Product = z.infer<typeof productSchema>;

const customerSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  phone: z.string().min(1),
});
export type Customer = z.infer<typeof customerSchema>;

export const checkoutSchema = z.object({
  products: z.array(productSchema),
  customer: customerSchema,
  locale: z.string<LanguageCode>(),
});
export type Checkout = z.infer<typeof checkoutSchema>;
