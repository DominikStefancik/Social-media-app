import { ApolloServerContext } from '@local/graphql/context';
import { PostFilter, PostSelector } from '@local/graphql/types/post';

export const postQueries = {
  post: async (_: any, args: { selector: PostSelector }, { postService }: ApolloServerContext) => {
    const { selector } = args;

    return await postService.getPost(selector);
  },

  posts: async (_: any, args: { filter: PostFilter }, { postService }: ApolloServerContext) => {
    const { filter } = args;

    return await postService.getPosts(filter);
  },

  // author: (parent: any, args: { selector: UserSelector }, context: ApolloServerContext) => {
  //   const { selector } = args;
  //   return context.userService.getUser(selector);
  // },
};
