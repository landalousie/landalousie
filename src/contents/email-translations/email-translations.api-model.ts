export interface EmailTranslations {
  id: string;
  language: 'fr';
  lastUpdate: string; // Stores the date in ISO 8601 format. For example: 2021-09-10T19:30:00.000Z
  'customerOrder.subject': string;
  'customerOrder.preview': string;
  'customerOrder.title': string;
  'customerOrder.body': string;
  'customerOrder.invoiceButton': string;
  'productList.quantity': string;
  'productList.total': string;
}
