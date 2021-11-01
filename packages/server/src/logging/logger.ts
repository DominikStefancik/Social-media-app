import * as pino from 'pino';

export const getLogger = (name: string): pino.Logger => {
  return pino({
    name,
    prettyPrint: {
      colorize: true,
      translateTime: 'yyyy-dd-mm hh:MM:ss TT',
      ignore: 'pid,hostname',
    },
  });
};
