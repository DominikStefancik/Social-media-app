import * as pino from 'pino';
import { PostRepository } from '@local/db-store/post/repository';
import { Post, PostModel } from '@local/db-store/post/model';
import { CreatePostData, PostFilter, PostSelector } from '@local/graphql/types/post';
import { User } from '@local/db-store/user/model';

export class PostService {
  private readonly repository: PostRepository;

  constructor(private readonly logger: pino.Logger) {
    this.repository = new PostRepository(PostModel, logger);
    this.logger.info('PostService successfully created.');
  }

  public createPost(user: User, data: CreatePostData): Promise<Post> {
    const { text } = data;
    return this.repository.createPost(user.id, text);
  }

  public async deletePost(user: User, selector: PostSelector): Promise<boolean> {
    const post = await this.getPost(selector);

    if (!post) {
      throw new Error('Cannot delete non-existing post.');
    }

    if (post.authorId !== user.id) {
      throw new Error('User is not an author of the post.');
    }

    return this.repository.deletePost(selector);
  }

  public async deletePosts(user: User, filter: PostFilter): Promise<boolean> {
    const posts = await this.getPosts(filter);
    const isAuthorOfAll = posts.every((post) => post.authorId === user.id);

    if (!isAuthorOfAll) {
      throw new Error('User is not an author of all posts');
    }

    return this.repository.deletePosts(filter);
  }

  public getPost(selector: PostSelector): Promise<Post | null> {
    return this.repository.getPost(selector);
  }

  public getPosts(filter: PostFilter): Promise<Post[]> {
    return this.repository.getPosts(filter);
  }
}
