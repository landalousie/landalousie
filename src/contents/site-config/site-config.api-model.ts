import type { Media } from '@content-island/api-client';

export interface Font {
  id: string;
  language: 'fr';
  lastUpdate: string; // Stores the date in ISO 8601 format. For example: 2021-09-10T19:30:00.000Z
  name: string;
  url: string;
}

export interface SiteConfig {
  id: string;
  language: 'fr';
  lastUpdate: string; // Stores the date in ISO 8601 format. For example: 2021-09-10T19:30:00.000Z
  favicon: Media;
  primaryColor: string; // Stores the color in hex format. For example: #FF5733
  secondaryColor: string; // Stores the color in hex format. For example: #FF5733
  titleFont: Font;
  bodyFont: Font;
}
