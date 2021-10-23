import { dateScalar } from '@local/graphql/scalars/date';
import { userMutations } from '@local/graphql/resolvers/user/mutations';
import { userQueries } from '@local/graphql/resolvers/user/queries';
import { postMutations } from '@local/graphql/resolvers/post/mutations';
import { postQueries } from '@local/graphql/resolvers/post/queries';

export const resolvers = {
  Date: dateScalar,

  Query: {
    ...userQueries,
    ...postQueries,
  },

  Mutation: {
    ...userMutations,
    ...postMutations,
  },
};
