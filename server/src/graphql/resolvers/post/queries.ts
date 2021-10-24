import { ApolloServerContext } from '@local/graphql/context';
import { PostFilter, PostSelector } from '@local/graphql/types/post';
import { Post } from '@local/db-store/post/model';

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
  author: (parent: Post, _: any, context: ApolloServerContext) => {
    const { authorId } = parent;

    return context.userService.getUser({ id: authorId });
  },
};
