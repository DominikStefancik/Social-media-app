import { dateScalar } from '@local/graphql/scalars/date';
import { userMutations } from '@local/graphql/resolvers/user/mutations';
import { userQueries } from '@local/graphql/resolvers/user/queries';

export const resolvers = {
  Date: dateScalar,

  Query: {
    ...userQueries,
  },

  Mutation: {
    ...userMutations,
  },
};
