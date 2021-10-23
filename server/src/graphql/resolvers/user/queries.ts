import { ApolloServerContext } from '@local/graphql/context';
import { UserFilter, UserSelector } from '@local/graphql/types/user';

export const userQueries = {
  user: (_: any, args: { selector: UserSelector }, { userService }: ApolloServerContext) => {
    const { selector } = args;
    return userService.getUser(selector);
  },

  users: (_: any, args: { filter: UserFilter }, { userService }: ApolloServerContext) => {
    const { filter } = args;
    return userService.getUsers(filter);
  },
};
