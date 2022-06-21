import { ApolloServer } from 'apollo-server-express';

import { getAppConfig } from '@local/config';
import { getLogger } from '@local/logging/logger';
import { MongooseConnection } from '@local/db-store/mongoose-connection';
import schema from './graphql/schema';
import { getContext } from '@local/graphql/context';

export const setup = async () => {
  const config = getAppConfig();
  const logger = getLogger(`${config.appName}/server`);

  const dbConnection = new MongooseConnection(
    {
      databaseUrl: config.databaseUrl,
      databaseName: config.databaseName,
    },
    logger
  );

  await dbConnection.connect();

  const context = getContext(logger);

  const apolloServer = new ApolloServer({
    schema,
    context,
    logger,
  });

  return {
    dbConnection,
    apolloServer,
  };
};
