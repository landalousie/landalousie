import { RollbarTransport } from '#common/logger-transports';
import { ENV } from '#core/constants';
import { format } from 'winston';
import { parseMessage } from '../logger.parsers';

const { combine, timestamp, printf } = format;

export const rollbar = new RollbarTransport({
  accessToken: ENV.ROLLBAR_API_KEY,
  environment: ENV.ROLLBAR_ENV,
  captureUncaught: ENV.IS_PRODUCTION,
  captureUnhandledRejections: ENV.IS_PRODUCTION,
  format: combine(
    timestamp(),
    printf(({ level, message, timestamp }) =>
      JSON.stringify({
        level,
        timestamp,
        message: parseMessage(message as string),
      })
    )
  ),
  level: 'info',
});
