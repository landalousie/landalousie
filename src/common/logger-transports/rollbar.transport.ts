import Rollbar, { type Configuration } from 'rollbar';
import Transport from 'winston-transport';

type Config = Transport.TransportStreamOptions & Configuration;

export class RollbarTransport extends Transport {
  private config: Config;
  private rollbar: Rollbar;

  constructor(config: Config = {}) {
    super(config);

    this.config = config;
    this.rollbar = new Rollbar({
      ...this.config,
    });
  }

  log(info: any, next: any) {
    setImmediate(() => this.emit('logged', info));
    const level: string = info.level;
    const message: string = info[Symbol.for('message')];
    (this.rollbar as any)[level](message);
    next();
  }
}
