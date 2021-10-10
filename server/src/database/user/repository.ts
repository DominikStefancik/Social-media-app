import { v4 as uuid } from 'uuid';
import { mongoose } from '@typegoose/typegoose';
import * as pino from 'pino';
import { User } from '@local/database/user/model';
import { UserSelector } from '@local/graphql/types/user';

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

  public updateUser(user: User) {
    const { id, username, password, email } = user;
    this.model.updateOne({ id }, { $set: { username, password, email, lastUpdated: new Date() } });
    this.logger.info(`Updated user (id=${id})`);
  }

  public deleteUser(id: string) {
    this.model.remove({ id });
    this.logger.info(`Deleted user (id=${id})`);
  }

  public async getUser(selector: UserSelector): Promise<User | null> {
    return this.model.findOne(selector);
  }
}
