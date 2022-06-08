import { v4 as uuid } from 'uuid';
import { mongoose } from '@typegoose/typegoose';
import * as pino from 'pino';
import { omitBy, isUndefined } from 'lodash';
import { Post, PostModel } from '@local/db-store/post/model';
import { PostFilter, PostSelector } from '@local/graphql/types/post';
import { CommentSelector } from '@local/graphql/types/comment';

export class PostRepository {
  private readonly model: mongoose.Model<Post>;

  constructor(private readonly logger: pino.Logger) {
    this.model = PostModel;
  }

  public async createPost(authorId: string, text: string): Promise<Post> {
    const data = {
      id: uuid(),
      authorId,
      text,
      createdAt: new Date(),
      comments: [],
      likes: [],
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
    const result = await this.model.deleteMany(this.toMongoFilter(filter));

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
    return this.model.find(this.toMongoFilter(filter));
  }

  public async createComment(postId: string, authorId: string, text: string): Promise<Post> {
    const id = uuid();
    const commentData = {
      id,
      authorId,
      text,
      createdAt: new Date(),
    };

    const post = (await this.getPost({ id: postId }))!;
    post.comments.push(commentData);
    await this.model.updateOne({ id: postId }, post);

    this.logger.info(`Created a new comment (id=${id}) in post (id=${postId})`);

    return post;
  }

  public async deleteComment(selector: CommentSelector): Promise<Post> {
    const { postId, commentId } = selector;

    const post = (await this.getPost({ id: postId }))!;
    const index = post.comments.findIndex((comment) => comment.id === commentId);

    post.comments.splice(index, 1);
    await this.model.updateOne({ id: postId }, post);

    this.logger.info(`Deleted a comment (id=${commentId}) in post (id=${postId})`);

    return post;
  }

  // This method works like a toggle
  // If the given userId is not found in the 'likes' array, that means a user liked a post
  // If, however, it is found in the array, it means a user unliked a post
  public async likePost(selector: PostSelector, userId: string): Promise<Post> {
    const { id } = selector;

    const post = (await this.getPost({ id }))!;
    const index = post.likes.findIndex((like) => like === userId);

    // userId is not found in the array -> user liked a post
    if (index === -1) {
      post.likes.push(userId);
    } else {
      // otherwise user unliked a post
      post.likes.splice(index, 1);
    }

    await this.model.updateOne({ id }, post);

    this.logger.info(
      `User (id=${userId}) ${index === -1 ? 'liked' : 'unliked'} the post (id=${id})`
    );

    return post;
  }

  /**
   * Transforms the Graphql filter into a MongoDb filter for the fields containing the array of values
   * @param filter
   * @private
   */
  private toMongoFilter(filter: PostFilter) {
    const mongoFilter = filter
      ? {
          ...filter,
          id: filter.id_in ? { $in: filter.id_in } : undefined,
          authorId: filter.authorId_in ? { $in: filter.authorId_in } : undefined,
        }
      : {};

    return omitBy(mongoFilter, isUndefined);
  }
}
