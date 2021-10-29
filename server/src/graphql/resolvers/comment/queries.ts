import { ApolloServerContext } from '@local/graphql/context';
import { Comment } from '@local/db-store/post/model';

export const commentFieldQueriesResolvers = {
  author: (parent: Comment, _: any, { userService }: ApolloServerContext) => {
    const { authorId } = parent;

    return userService.getUser({ id: authorId });
  },
};
