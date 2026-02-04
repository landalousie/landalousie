import { ENV } from '#core/constants';
import Rollbar from 'rollbar';

const rollbarClient = ENV.ROLLBAR_API_KEY
  ? new Rollbar({
      accessToken: ENV.ROLLBAR_API_KEY,
      environment: ENV.ROLLBAR_ENV,
      captureUncaught: ENV.IS_PRODUCTION,
      captureUnhandledRejections: ENV.IS_PRODUCTION,
    })
  : null;

const log = (
  level: string,
  message: string,
  context?: Record<string, unknown> | undefined
) => {
  if (!rollbarClient) {
    return;
  }

  const validLevels: Record<string, keyof Rollbar> = {
    error: 'error',
    warn: 'warning',
    info: 'info',
    debug: 'debug',
    critical: 'critical',
  };

  const rollbarLevel = validLevels[level] || 'error';

  const fn = rollbarClient[rollbarLevel as keyof Rollbar] as Function;

  if (typeof fn === 'function') {
    fn.call(rollbarClient, message, context);
  } else {
    rollbarClient.error(message, context);
  }
};

export const rollbar = {
  log,
};
