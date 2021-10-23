import * as pino from 'pino';
import { ExpressContext } from 'apollo-server-express/src/ApolloServer';
import { UserService } from '@local/services/user/service';
import { PostService } from '@local/services/post/service';

export interface ApolloServerContext extends ExpressContext {
  userService: UserService;
  postService: PostService;
}

export const getContext = (
  logger: pino.Logger
): ((expressContext: ExpressContext) => ApolloServerContext) => {
  const userService = new UserService(logger);
  const postService = new PostService(logger);

  // this context function will be called upon each request
  return (expressContext: ExpressContext): ApolloServerContext => ({
    ...expressContext,
    userService,
    postService,
  });
};
