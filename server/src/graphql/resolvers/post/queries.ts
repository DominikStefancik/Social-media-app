import { ApolloServerContext } from '@local/graphql/context';
import { PostFilter, PostSelector } from '@local/graphql/types/post';
import { UserSelector } from '@local/graphql/types/user';

export const postRootQueriesResolvers = {
  post: async (_: any, args: { selector: PostSelector }, { postService }: ApolloServerContext) => {
    const { selector } = args;

    return await postService.getPost(selector);
  },

  posts: async (_: any, args: { filter: PostFilter }, { postService }: ApolloServerContext) => {
    const { filter } = args;

    return await postService.getPosts(filter);
  },
};

export const postFieldQueriesResolvers = {
  author: (parent: any, args: { selector: UserSelector }, context: ApolloServerContext) => {
    const { selector } = args;
    return context.userService.getUser(selector);
  },
};
