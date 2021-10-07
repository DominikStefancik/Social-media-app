import 'module-alias/register';
import * as express from 'express';
import * as cors from 'cors';
import { apolloServer } from '@local/graphql/server';
import { MongooseConnection } from '@local/database/mongoose-connection';
import { getAppConfig } from './config';
import { getLogger } from '@local/logging/logger';

const port = 3000;
const config = getAppConfig();
const logger = getLogger(`${config.appName}/server`);

const main = async (): Promise<express.Express> => {
  const app: express.Express = express();

  logger.info(`Starting ${config.appName}...`);

  const dbConnection = new MongooseConnection(
    {
      databaseUrl: config.databaseUrl,
      databaseName: config.databaseName,
    },
    logger
  );

  await dbConnection.connect();

  app.use(cors());

  // We must call apolloServer.start() before calling apolloServer.getMiddleware(), otherwise the app doesn't start
  await apolloServer.start();
  app.use(apolloServer.getMiddleware());

  app.get('/', (request, response) => response.send('Server is running!'));

  return app;
};

main().then((app) => {
  app.listen(port, () => {
    logger.info(`Server listening for requests on port ${port}`);
  });
});
