import { ApolloServerContext } from '@local/graphql/context';
import { CreatePostData, PostFilter, PostSelector } from '@local/graphql/types/post';
import { AuthenticationError } from 'apollo-server-express';
import { User } from '@local/db-store/user/model';

export const postMutations = {
  createPost: async (
    _: any,
    args: { data: CreatePostData },
    { req, postService, userService }: ApolloServerContext
  ) => {
    let user: User;

    try {
      user = userService.isUserAuthorised(req);
    } catch (error: any) {
      throw new AuthenticationError(error.message);
    }

    return await postService.createPost(user, args.data);
  },

  deletePost: async (
    _: any,
    args: { selector: PostSelector },
    { req, postService, userService }: ApolloServerContext
  ) => {
    let user: User;

    try {
      user = userService.isUserAuthorised(req);
    } catch (error: any) {
      throw new AuthenticationError(error.message);
    }

    return await postService.deletePost(user, args.selector);
  },

  deletePosts: async (
    _: any,
    args: { filter: PostFilter },
    { req, postService, userService }: ApolloServerContext
  ) => {
    let user: User;

    try {
      user = userService.isUserAuthorised(req);
    } catch (error: any) {
      throw new AuthenticationError(error.message);
    }

    return await postService.deletePosts(user, args.filter);
  },
};
