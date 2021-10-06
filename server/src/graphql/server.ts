import { ApolloServer } from 'apollo-server-express';
import { typeDefinitions as typeDefs } from './type-definitions';
import { resolvers } from './resolvers';

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});
