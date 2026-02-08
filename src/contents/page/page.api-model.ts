export type PageId = 'home' | 'about';

export interface Page {
  id: string;
  language: 'fr';
  lastUpdate: string; // Stores the date in ISO 8601 format. For example: 2021-09-10T19:30:00.000Z
  pageId: PageId;
  title: string;
  description: string;
  heroTitle: string;
  heroDescription: string;
  content?: string;
}
