import * as inspector from 'inspector';
const session = new inspector.Session();

export function startProfile(seconds: number): Promise<object> {
  return new Promise((resolve, reject) => {
    session.connect();
    session.post('Profiler.enable', () => {
      session.post('Profiler.start', () => {
        setTimeout(() => {
          session.post('Profiler.stop', (err: Error, { profile }: any) => {
            if (!err) {
              resolve(profile);
            } else {
              reject(err);
            }
            session.disconnect();
          });
        }, 1000 * seconds);
      });
    });
  });
}
