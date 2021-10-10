import { UserService } from '@local/services/user/service';

export interface ApolloServerContext {
  userService: UserService;
}
