import { User } from './user/model';

export const getUserDetailsAsString = (user: User): string => {
  return `User (id=${user.id}, username=${user.username})`;
};
