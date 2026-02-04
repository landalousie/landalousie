import { ENV } from '#core/constants';
import pino from 'pino';
import { parseMessage } from './logger.parsers';
import { rollbar } from './transports';

const rollbarEnabled = ENV.IS_PRODUCTION && !!ENV.ROLLBAR_API_KEY;

export const logger = pino({
  level: ENV.IS_PRODUCTION ? 'info' : 'debug',
  hooks: {
    logMethod(args, method, level) {
      method.apply(this, args);

      if (!rollbarEnabled) {
        return;
      }

      const [objOrMsg, msgOrArgs] = args;

      let message: string;
      let context: Record<string, unknown> | undefined;

      if (typeof objOrMsg === 'string') {
        message = objOrMsg;
        context = undefined;
      } else if (typeof msgOrArgs === 'string') {
        message = msgOrArgs;
        context = objOrMsg as Record<string, unknown>;
      } else {
        message = parseMessage(JSON.stringify(objOrMsg));
        context = undefined;
      }

      const parsedMessage = parseMessage(message);
      const levelLabel = this.levels.labels[level] ?? 'error';

      rollbar.log(levelLabel, parsedMessage, context);
    },
  },
});
