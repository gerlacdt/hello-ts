import * as bunyan from 'bunyan';

const logger = bunyan.createLogger({ name: 'myapp' });

export { logger };
