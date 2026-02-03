import { format, transports } from 'winston';
import { parseMessage } from '../logger.parsers';

const { combine, colorize, timestamp, printf } = format;

export const console = new transports.Console({
  format: combine(
    colorize(),
    timestamp(),
    printf(({ level, message, timestamp }) => {
      return `[${level}] [${timestamp}] message: ${parseMessage(message as string)}`;
    })
  ),
});
