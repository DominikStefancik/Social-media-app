import { ApolloServerContext } from '@local/graphql/context';
import { CreatePostData, PostFilter, PostSelector } from '@local/graphql/types/post';
import { AuthenticationError, ForbiddenError, UserInputError } from 'apollo-server-express';
import { InputError, UserAuthorisationError, UserValidationError } from '@local/errors/types';

export const postMutationsResolvers = {
  createPost: async (
    _: any,
    args: { data: CreatePostData },
    { req, postService, userService }: ApolloServerContext
  ) => {
    try {
      const user = userService.getAuthorisedUser(req);
      return await postService.createPost(user, args.data);
    } catch (error: any) {
      if (error instanceof UserValidationError) {
        throw new AuthenticationError(error.message);
      }

      if (error instanceof InputError) {
        throw new UserInputError(error.message, { errors: { [error.name]: error.message } });
      }
    }
  },

  deletePost: async (
    _: any,
    args: { selector: PostSelector },
    { req, postService, userService }: ApolloServerContext
  ) => {
    try {
      const user = userService.getAuthorisedUser(req);
      return await postService.deletePost(user, args.selector);
    } catch (error: any) {
      if (error instanceof UserValidationError) {
        throw new AuthenticationError(error.message);
      }

      if (error instanceof InputError) {
        throw new UserInputError(error.message);
      }

      if (error instanceof UserAuthorisationError) {
        throw new ForbiddenError(error.message);
      }
    }
  },

  deletePosts: async (
    _: any,
    args: { filter: PostFilter },
    { req, postService, userService }: ApolloServerContext
  ) => {
    try {
      const user = userService.getAuthorisedUser(req);
      return await postService.deletePosts(user, args.filter);
    } catch (error: any) {
      if (error instanceof UserValidationError) {
        throw new AuthenticationError(error.message);
      }

      if (error instanceof UserAuthorisationError) {
        throw new ForbiddenError(error.message);
      }
    }
  },

  likePost: async (
    _: any,
    args: { selector: PostSelector },
    { req, postService, userService }: ApolloServerContext
  ) => {
    try {
      const user = userService.getAuthorisedUser(req);
      return await postService.likePost(user, args.selector);
    } catch (error) {
      if (error instanceof UserValidationError) {
        throw new AuthenticationError(error.message);
      }

      if (error instanceof InputError) {
        throw new UserInputError(error.message);
      }
    }
  },
};
