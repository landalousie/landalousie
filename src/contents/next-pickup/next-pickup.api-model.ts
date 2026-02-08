export interface NextPickup {
  id: string;
  language: 'fr';
  lastUpdate: string; // Stores the date in ISO 8601 format. For example: 2021-09-10T19:30:00.000Z
  title: string;
  description: string;
  dateTime: string; // Stores the date in ISO 8601 format. For example: 2021-09-10T19:30:00.000Z
}
