import { ENV } from '#core/constants/index.js';
import { createLogger } from 'winston';
import Transport from 'winston-transport';
import { console, rollbar } from './transports/index.js';

let transports: Transport[] = [console];
if (ENV.IS_PRODUCTION && ENV.ROLLBAR_API_KEY) {
  transports = [...transports, rollbar];
}

export const logger = createLogger({
  transports,
});
