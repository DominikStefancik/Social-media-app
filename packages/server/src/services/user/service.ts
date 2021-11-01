import * as express from 'express';
import * as pino from 'pino';
import { hash, compare } from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { isEmpty } from 'lodash';
import { UserRepository } from '@local/db-store/user/repository';
import { User, UserModel } from '@local/db-store/user/model';
import { getAppConfig } from '@local/config';
import { CreateUserData, LoginUserData, UserFilter, UserSelector } from '@local/graphql/types/user';
import {
  validateCreateUserData,
  validateUserAuthorisation,
  validateUserLoginData,
} from '@local/services/user/validators';
import { InputError } from '@local/errors/types';

type UserWithToken = User & { token?: string };

export class UserService {
  private readonly repository: UserRepository;

  constructor(private readonly logger: pino.Logger) {
    this.repository = new UserRepository(UserModel, logger);
    this.logger.info('UserService successfully created.');
  }

  public async createUser(data: CreateUserData): Promise<UserWithToken> {
    const { username, email } = data;
    let password = data.password;
    const errors = validateCreateUserData(data);

    if (!isEmpty(errors)) {
      throw new InputError(Object.values(errors)[0] as string);
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
      throw new InputError(Object.values(errors)[0] as string);
    }

    const user: UserWithToken | null = await this.getUser({ username });

    if (!user) {
      throw new InputError(`User with the username ${username} doesn't exist.`);
    }

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      throw new InputError('Password is incorrect');
    }

    user.token = this.generateJwtToken(user);

    return user;
  }

  public getUser(selector: UserSelector): Promise<User | null> {
    return this.repository.getUser(selector);
  }

  public getUsers(filter: UserFilter): Promise<User[]> {
    return this.repository.getUsers(filter);
  }

  public deleteUser(selector: UserSelector): Promise<boolean> {
    return this.repository.deleteUser(selector);
  }

  public getAuthorisedUser(request: express.Request): User {
    return validateUserAuthorisation(request);
  }

  private generateJwtToken(user: User) {
    const { jwtTokenSecret } = getAppConfig();
    const { id, username, email } = user;

    return jwt.sign({ id, username, email }, jwtTokenSecret, {
      expiresIn: '1h',
    });
  }
}
