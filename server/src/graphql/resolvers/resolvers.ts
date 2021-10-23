import { dateScalar } from '@local/graphql/scalars/date';
import { userMutationsResolvers } from '@local/graphql/resolvers/user/mutations';
import { userRootQueriesResolvers } from '@local/graphql/resolvers/user/queries';
import { postMutationsResolvers } from '@local/graphql/resolvers/post/mutations';
import {
  postFieldQueriesResolvers,
  postRootQueriesResolvers,
} from '@local/graphql/resolvers/post/queries';

export const resolvers = {
  Date: dateScalar,

  Query: {
    ...userRootQueriesResolvers,
    ...postRootQueriesResolvers,
  },

  Mutation: {
    ...userMutationsResolvers,
    ...postMutationsResolvers,
  },

  Post: {
    ...postFieldQueriesResolvers,
  },
};
