import { v4 as uuid } from 'uuid';
import { mongoose } from '@typegoose/typegoose';
import * as pino from 'pino';
import { omitBy, isUndefined } from 'lodash';
import { Post } from '@local/db-store/post/model';
import { PostFilter, PostSelector } from '@local/graphql/types/post';

export class PostRepository {
  constructor(private readonly model: mongoose.Model<Post>, private readonly logger: pino.Logger) {}

  public async createPost(authorId: string, text: string): Promise<Post> {
    const data = {
      id: uuid(),
      authorId,
      text,
      createdAt: new Date(),
    };

    const newPost = await this.model.create(data);

    this.logger.info(`Created a new post (id=${newPost.id})`);

    return newPost;
  }

  public async deletePost(selector: PostSelector): Promise<boolean> {
    const result = await this.model.deleteOne(selector);

    if (result.deletedCount === 1) {
      this.logger.info(`Deleted post (id=${selector.id})`);
      return true;
    }

    return false;
  }

  public async deletePosts(filter: PostFilter): Promise<boolean> {
    const result = await this.model.deleteMany(filter);

    if (result.deletedCount > 0) {
      this.logger.info(`Deleted ${result.deletedCount} posts`);
      return true;
    }

    return false;
  }

  public async getPost(selector: PostSelector): Promise<Post | null> {
    return this.model.findOne(selector);
  }

  public async getPosts(filter: PostFilter): Promise<Post[]> {
    // we have to transform the Graphql filter into a MongoDb filter for the fields containing the array of values
    const mongoFilter = filter
      ? {
          ...filter,
          id: filter.id_in ? { $in: filter.id_in } : undefined,
          authorId: filter.authorId_in ? { $in: filter.authorId_in } : undefined,
        }
      : {};

    return this.model.find(omitBy(mongoFilter, isUndefined));
  }
}
