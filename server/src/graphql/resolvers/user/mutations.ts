import { ApolloServerContext } from '@local/graphql/server';
import { CreateUserData, LoginUserData } from '@local/graphql/types/user';
import { UserInputError } from 'apollo-server-express';

export const userMutations = {
  createUser: async (_: any, args: { data: CreateUserData }, context: ApolloServerContext) => {
    try {
      return await context.userService.createUser(args.data);
    } catch (error: any) {
      throw new UserInputError(error.message, { errors: { [error.name]: error.message } });
    }
  },

  loginUser: async (_: any, args: { data: LoginUserData }, context: ApolloServerContext) => {
    try {
      return await context.userService.loginUser(args.data);
    } catch (error: any) {
      throw new UserInputError(error.message, { errors: { [error.name]: error.message } });
    }
  },
};
