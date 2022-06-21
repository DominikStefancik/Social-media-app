import { ApolloServerContext } from '@local/graphql/context';
import { PostFilter, PostSelector } from '@local/graphql/types/post';
import { Post } from '@local/db-store/post/model';
import { Page } from '@local/graphql/types/common';

export const postRootQueriesResolvers = {
  post: async (_: any, args: { selector: PostSelector }, { postService }: ApolloServerContext) => {
    const { selector } = args;

    return await postService.getPost(selector);
  },

  posts: async (
    _: any,
    args: { filter: PostFilter; page: Page },
    { postService }: ApolloServerContext
  ) => {
    const { filter, page } = args;

    return await postService.getPostFeed(filter, page);
  },
};

export const postFieldQueriesResolvers = {
  author: (parent: Post, _: any, { userService }: ApolloServerContext) => {
    const { authorId } = parent;

    return userService.getUser({ id: authorId });
  },
};
