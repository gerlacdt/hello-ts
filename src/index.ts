import { app } from './app';
import { logger } from './logger';

const port = normalizePort(process.env.PORT || 3000);

app.listen(port, () => {
  logger.info(`Started app at port ${port}`);
});

function normalizePort(val: number | string): number | string | boolean {
  const p: number = typeof val === 'string' ? parseInt(val, 10) : val;
  if (isNaN(p)) {
    return val;
  } else if (val >= 0) {
    return val;
  } else {
    return false;
  }
}
