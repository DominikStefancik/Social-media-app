import * as pino from 'pino';
import { hash } from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { isEmpty } from 'lodash';
import { UserRepository } from '@local/database/user/repository';
import { User } from '@local/database/user/model';
import { getAppConfig } from '@local/config';
import { CreateUserData, UserSelector } from '@local/graphql/types/user';
import { validateCreateUserData } from '@local/services/user/validators';

type CreatedUser = User & { token?: string };

export class UserService {
  constructor(private readonly repository: UserRepository, private readonly logger: pino.Logger) {
    this.logger.info('User service successfully created.');
  }

  public async createUser(data: CreateUserData): Promise<CreatedUser> {
    const { username, email } = data;
    let password = data.password;
    const errors = validateCreateUserData(data);

    if (!isEmpty(errors)) {
      throw new Error(Object.values(errors)[0] as string);
    }

    if (await this.verifyExistingUser(username)) {
      throw new Error(`User with the username ${username} already exists.`);
    }

    const { jwtTokenSecret } = getAppConfig();
    password = await hash(password, 12);
    const newUser: CreatedUser = await this.repository.createUser(username, password, email);

    newUser.token = jwt.sign({ id: newUser.id, username, email }, jwtTokenSecret, {
      expiresIn: '1h',
    });

    return newUser;
  }

  public async getUser(selector: UserSelector): Promise<User | null> {
    return await this.repository.getUser(selector);
  }

  private async verifyExistingUser(username: string): Promise<boolean> {
    const existingUser = await this.getUser({ username });

    return !!existingUser;
  }
}
