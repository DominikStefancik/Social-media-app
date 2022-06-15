import * as pino from 'pino';
import { isEmpty } from 'lodash';
import { PostRepository } from '@local/db-store/post/repository';
import { Post } from '@local/db-store/post/model';
import { CreatePostData, PostFilter, PostSelector } from '@local/graphql/types/post';
import { User } from '@local/db-store/user/model';
import { CommentSelector, CreateCommentData } from '@local/graphql/types/comment';
import {
  validateCommentSelector,
  validateCreateCommentData,
} from '@local/services/post/validators';
import { InputError, UserAuthorisationError } from '@local/errors/types';

export class PostService {
  private readonly repository: PostRepository;

  constructor(private readonly logger: pino.Logger) {
    this.repository = new PostRepository(logger);
    this.logger.info('PostService successfully created.');
  }

  public createPost(user: User, data: CreatePostData): Promise<Post> {
    const { text } = data;

    if (text.trim() === '') {
      throw new InputError('text', 'Text must not be empty');
    }

    return this.repository.createPost(user, text);
  }

  public async deletePost(user: User, selector: PostSelector): Promise<boolean> {
    const post = await this.getPost(selector);

    if (!post) {
      throw new InputError('postId', `The post (id=${selector.id}) doesn't exist`);
    }

    if (post.authorId !== user.id) {
      throw new UserAuthorisationError('User is not an author of the post.');
    }

    return this.repository.deletePost(user, selector);
  }

  public async deletePosts(user: User, filter: PostFilter): Promise<boolean> {
    const posts = await this.getPosts(filter);
    const isAuthorOfAll = posts.every((post) => post.authorId === user.id);

    if (!isAuthorOfAll) {
      throw new UserAuthorisationError('User is not an author of all posts');
    }

    return this.repository.deletePosts(filter);
  }

  public getPost(selector: PostSelector): Promise<Post | null> {
    return this.repository.getPost(selector);
  }

  public getPosts(filter: PostFilter): Promise<Post[]> {
    return this.repository.getPosts(filter);
  }

  public async createComment(user: User, data: CreateCommentData): Promise<Post> {
    const { postId, text } = data;
    const errors = validateCreateCommentData(data);

    if (!isEmpty(errors)) {
      const input = Object.keys(errors)[0] as string;
      throw new InputError(input, errors[input]);
    }

    const post = await this.getPost({ id: postId });

    if (!post) {
      throw new InputError('postId', `The post (id=${postId}) doesn't exist`);
    }

    return this.repository.createComment(user, postId, text);
  }

  public async deleteComment(user: User, selector: CommentSelector): Promise<Post> {
    const { postId, commentId } = selector;
    const errors = validateCommentSelector(selector);

    if (!isEmpty(errors)) {
      const input = Object.keys(errors)[0] as string;
      throw new InputError(input, errors[input]);
    }

    const post = await this.getPost({ id: postId });

    if (!post) {
      throw new InputError('postId', `The post (id=${postId}) doesn't exist`);
    }

    const comment = post.comments.find((comment) => comment.id === commentId);

    if (!comment) {
      throw new InputError(
        'commentId',
        `The comment (id=${commentId}) in the post (id=${postId}) doesn't exist`
      );
    }

    if (user.id !== post.authorId && user.id !== comment.authorId) {
      throw new UserAuthorisationError(
        'Only author of the post or author of the comment can delete a comment'
      );
    }

    return this.repository.deleteComment(user, selector);
  }

  public async likePost(user: User, selector: PostSelector): Promise<Post> {
    const { id } = selector;
    const post = await this.getPost({ id });

    if (id.trim() === '') {
      throw new InputError('postId', 'The id of a post must not be empty');
    }

    if (!post) {
      throw new InputError('postId', `The post (id=${id}) doesn't exist`);
    }

    return this.repository.likePost(user, selector);
  }
}
