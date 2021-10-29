import { CommentSelector, CreateCommentData } from '@local/graphql/types/comment';
import { ApolloServerContext } from '@local/graphql/context';
import { AuthenticationError, ForbiddenError, UserInputError } from 'apollo-server-express';
import { InputError, UserAuthorisationError, UserValidationError } from '@local/errors/types';

export const commentsMutationsResolvers = {
  createComment: async (
    _: any,
    args: { data: CreateCommentData },
    { postService, userService, req }: ApolloServerContext
  ) => {
    try {
      const user = userService.getAuthorisedUser(req);
      return await postService.createComment(user, args.data);
    } catch (error: any) {
      if (error instanceof UserValidationError) {
        throw new AuthenticationError(error.message);
      }

      if (error instanceof InputError) {
        throw new UserInputError(error.message, { errors: { [error.name]: error.message } });
      }
    }
  },

  deleteComment: async (
    _: any,
    args: { selector: CommentSelector },
    { postService, userService, req }: ApolloServerContext
  ) => {
    try {
      const user = userService.getAuthorisedUser(req);
      return await postService.deleteComment(user, args.selector);
    } catch (error: any) {
      if (error instanceof UserValidationError) {
        throw new AuthenticationError(error.message);
      }

      if (error instanceof InputError) {
        throw new UserInputError(error.message, { errors: { [error.name]: error.message } });
      }

      if (error instanceof UserAuthorisationError) {
        throw new ForbiddenError(error.message);
      }
    }
  },
};
