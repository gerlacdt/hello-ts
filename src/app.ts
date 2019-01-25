import * as bodyParser from 'body-parser';
import * as express from 'express';
import { logger } from './logger';
import { startProfile } from './profiler';

const app: express.Application = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

function fib(n: number): number {
  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }
  return fib(n - 2) + fib(n - 1);
}

function getInt(n: string) {
  const num = parseInt(n, 10);
  if (!num || isNaN(num)) {
    throw Error('Not a number');
  }
  return num;
}

function fibHandler(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const n = getInt(req.query.n);
    const result = {
      result: fib(n),
    };
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function profileHandler(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const seconds = getInt(req.query.seconds);
    const profile = await startProfile(seconds);
    res.status(200).send(JSON.stringify(profile));
  } catch (err) {
    next(err);
  }
}

function errorHandler(
  err: Error,
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction,
) {
  logger.error(`ERROR ${err.message}`);
  res.status(500).json({ err: err.message });
}

const router = express.Router();

router.get('/fib', fibHandler);
router.get('/profile', profileHandler);

app.use('/', router);

// @ts-ignore
app.use(errorHandler);

export { app };
