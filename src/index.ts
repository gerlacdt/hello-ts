import * as http from 'http';

// tslint:disable-next-line
const debug = require('debug')('server');
import App from './App';

const port = normalizePort(process.env.PORT || 3000);
App.set('port', port);
const server = http.createServer(App);
// const server = App.listen(port, () => {
//     debug('listening in callback function');
// })
server.on('error', onError);
server.on('listening', onListening);
server.listen(port);

function normalizePort(val: number | string): number | string | boolean {
  const p: number = typeof val === 'string' ? parseInt(val, 10) : val;
  if (isNaN(p)) {
    return val;
  } else if (port >= 0) {
    return port;
  } else {
    return false;
  }
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      debug(`${bind} requires elevated priviliges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      debug(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(): void {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}
