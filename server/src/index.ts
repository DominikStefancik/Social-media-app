import 'module-alias/register';
import * as express from 'express';
import * as cors from 'cors';
import { apolloServer } from '@local/graphql/server';
import { MongooseConnection } from '@local/database/mongoose-connection';
import { getAppConfig } from './config';

const main = async (): Promise<express.Express> => {
  const { databaseUrl, databaseName } = getAppConfig();
  const app: express.Express = express();

  const dbConnection = new MongooseConnection({
    databaseUrl,
    databaseName,
  });

  await dbConnection.connect();

  app.use(cors());

  // We must call apolloServer.start() before calling apolloServer.getMiddleware(), otherwise the app doesn't start
  await apolloServer.start();
  app.use(apolloServer.getMiddleware());

  app.get('/', (request, response) => response.send('Server is running!'));

  return app;
};

main().then((app) => {
  app.listen(8080, () => {
    console.log('Server listening for requests on port 8080');
  });
});
