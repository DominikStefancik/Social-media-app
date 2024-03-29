import { ApolloServerContext } from '@local/graphql/context';
import { CreateUserData, LoginUserData, UserSelector } from '@local/graphql/types/user';
import { UserInputError } from 'apollo-server-express';

export const userMutationsResolvers = {
  createUser: async (
    _: any,
    args: { data: CreateUserData },
    { userService }: ApolloServerContext
  ) => {
    try {
      return await userService.createUser(args.data);
    } catch (error: any) {
      throw new UserInputError(error.message, {
        errors: { [error.name]: error.message },
        inputs: { [error.input]: error.input },
      });
    }
  },

  loginUser: async (
    _: any,
    args: { data: LoginUserData },
    { userService }: ApolloServerContext
  ) => {
    try {
      return await userService.loginUser(args.data);
    } catch (error: any) {
      throw new UserInputError(error.message, {
        errors: { [error.name]: error.message },
        inputs: { [error.input]: error.input },
      });
    }
  },

  deleteUser: async (
    _: any,
    args: { selector: UserSelector },
    { userService }: ApolloServerContext
  ) => {
    return await userService.deleteUser(args.selector);
  },
};
