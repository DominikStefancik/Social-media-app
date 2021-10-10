import 'module-alias/register';
import * as express from 'express';
import * as cors from 'cors';
import { getAppConfig } from './config';
import { getLogger } from '@local/logging/logger';
import { setup } from '@local/setup';

const port = 3000;
const config = getAppConfig();
const logger = getLogger(`${config.appName}/server`);

const main = async (): Promise<express.Express> => {
  logger.info(`Starting ${config.appName}...`);

  const app: express.Express = express();
  const { apolloServer } = await setup();

  app.use(cors());

  // We must call apolloServer.start() before calling apolloServer.getMiddleware(), otherwise the app doesn't start
  await apolloServer.start();
  app.use(apolloServer.getMiddleware());
  logger.info('Apollo Server started.');

  app.get('/', (request, response) => response.send('Server is running!'));

  return app;
};

main().then((app) => {
  app.listen(port, () => {
    logger.info(`Server listening for requests on port ${port}.`);
  });
});
