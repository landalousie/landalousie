export const ENV = {
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  CONTENT_ISLAND_ACCESS_TOKEN: process.env.CONTENT_ISLAND_ACCESS_TOKEN || '',
  STRIPE_API_KEY: process.env.STRIPE_API_KEY || '',
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || '',
  SITE_URL: process.env.SITE_URL || '',
  ROLLBAR_API_KEY: process.env.ROLLBAR_API_KEY || '',
  ROLLBAR_ENV: process.env.ROLLBAR_ENV || '',
  RESEND_API_KEY: process.env.RESEND_API_KEY || '',
  DEVELOP_TO_EMAIL: process.env.DEVELOP_TO_EMAIL || '',
  ENCRYPT_ASSETS_TOKEN: process.env.ENCRYPT_ASSETS_TOKEN || '',
};
