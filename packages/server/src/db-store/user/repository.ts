import { v4 as uuid } from 'uuid';
import { mongoose } from '@typegoose/typegoose';
import * as pino from 'pino';
import { isUndefined, omitBy } from 'lodash';
import { User } from '@local/db-store/user/model';
import { UserFilter, UserSelector } from '@local/graphql/types/user';

export class UserRepository {
  constructor(private readonly model: mongoose.Model<User>, private readonly logger: pino.Logger) {}

  public async createUser(username: string, password: string, email: string): Promise<User> {
    const data = {
      id: uuid(),
      username,
      password,
      email,
      createdAt: new Date(),
    };

    const newUser = await this.model.create(data);

    this.logger.info(`Created a new user (id=${newUser.id})`);

    return newUser;
  }

  public async updateUser(user: User) {
    const { id, username, password, email } = user;
    await this.model.updateOne(
      { id },
      { $set: { username, password, email, lastUpdated: new Date() } }
    );
    this.logger.info(`Updated user (id=${id})`);
  }

  public async deleteUser(selector: UserSelector): Promise<boolean> {
    const result = await this.model.deleteOne(selector);

    if (result.deletedCount === 1) {
      this.logger.info(`Deleted user (id=${selector.id})`);
      return true;
    }

    return false;
  }

  public async getUser(selector: UserSelector): Promise<User | null> {
    return this.model.findOne(selector);
  }

  public async getUsers(filter: UserFilter): Promise<User[]> {
    // we have to transform the Graphql filter into a MongoDb filter for the fields containing the array of values
    const mongoFilter = filter
      ? {
          id: filter.id_in ? { $in: filter.id_in } : undefined,
          username: filter.username_in ? { $in: filter.username_in } : undefined,
        }
      : {};

    return this.model.find(omitBy(mongoFilter, isUndefined));
  }
}
