import { getAppConfig } from '@local/config';
import { getLogger } from '@local/logging/logger';
import { MongooseConnection } from '@local/database/mongoose-connection';
import { UserRepository } from '@local/database/user/repository';
import { UserModel } from '@local/database/user/model';
import { ApolloServer } from 'apollo-server-express';
import { schema as typeDefs } from '@local/graphql/schema';
import { resolvers } from '@local/graphql/resolvers/resolvers';
import { UserService } from '@local/services/user/service';
import { ApolloServerContext } from '@local/graphql/server';

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

  const context: ApolloServerContext = {
    userService: new UserService(new UserRepository(UserModel, logger), logger),
  };

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    logger,
  });

  return {
    dbConnection,
    apolloServer,
  };
};
