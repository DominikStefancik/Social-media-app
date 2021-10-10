import * as pino from 'pino';
import { hash, compare } from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { isEmpty } from 'lodash';
import { UserRepository } from '@local/database/user/repository';
import { User } from '@local/database/user/model';
import { getAppConfig } from '@local/config';
import { CreateUserData, LoginUserData, UserSelector } from '@local/graphql/types/user';
import { validateCreateUserData, validateUserLoginData } from '@local/services/user/validators';

type UserWithToken = User & { token?: string };

export class UserService {
  constructor(private readonly repository: UserRepository, private readonly logger: pino.Logger) {
    this.logger.info('User service successfully created.');
  }

  public async createUser(data: CreateUserData): Promise<UserWithToken> {
    const { username, email } = data;
    let password = data.password;
    const errors = validateCreateUserData(data);

    if (!isEmpty(errors)) {
      throw new Error(Object.values(errors)[0] as string);
    }

    if (await this.getUser({ username })) {
      throw new Error(`User with the username ${username} already exists.`);
    }

    password = await hash(password, 12);
    const newUser: UserWithToken = await this.repository.createUser(username, password, email);

    newUser.token = this.generateJwtToken(newUser);

    return newUser;
  }

  public async loginUser(data: LoginUserData): Promise<UserWithToken> {
    const { username, password } = data;
    const errors = validateUserLoginData(data);

    if (!isEmpty(errors)) {
      throw new Error(Object.values(errors)[0] as string);
    }

    const user: UserWithToken | null = await this.getUser({ username });

    if (!user) {
      throw new Error(`User with the username ${username} doesn't exist.`);
    }

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Password is incorrect');
    }

    user.token = this.generateJwtToken(user);

    return user;
  }

  public async getUser(selector: UserSelector): Promise<User | null> {
    return await this.repository.getUser(selector);
  }

  private generateJwtToken(user: User) {
    const { jwtTokenSecret } = getAppConfig();
    const { id, username, email } = user;

    return jwt.sign({ id, username, email }, jwtTokenSecret, {
      expiresIn: '1h',
    });
  }
}
