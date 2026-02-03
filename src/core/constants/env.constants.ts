export const ENV = {
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  CONTENT_ISLAND_ACCESS_TOKEN: process.env.CONTENT_ISLAND_ACCESS_TOKEN || '',
  STRIPE_API_KEY: process.env.STRIPE_API_KEY || '',
  SITE_URL: process.env.SITE_URL || '',
  ROLLBAR_API_KEY: process.env.ROLLBAR_API_KEY || '',
  ROLLBAR_ENV: process.env.ROLLBAR_ENV || '',
};
