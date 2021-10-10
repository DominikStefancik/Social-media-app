import { ApolloServerContext } from '@local/graphql/server';
import { UserSelector } from '@local/graphql/types/user';

export const userQueries = {
  user: (_: any, args: { selector: UserSelector }, context: ApolloServerContext) => {
    const { selector } = args;
    return context.userService.getUser(selector);
  },
};
