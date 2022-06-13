import { CommentSelector, CreateCommentData } from '@local/graphql/types/comment';
import { InputValidationErrors } from '@local/errors/types';

export const validateCreateCommentData = (data: CreateCommentData): InputValidationErrors => {
  const { postId, text } = data;
  const errors = {} as InputValidationErrors;

  if (postId.trim() === '') {
    errors.postId = 'PostId must not be empty';
  }

  if (text.trim() === '') {
    errors.text = 'Text must not be empty';
  }

  return errors;
};

export const validateCommentSelector = (selector: CommentSelector): InputValidationErrors => {
  const { postId, commentId } = selector;
  const errors = {} as InputValidationErrors;

  if (postId.trim() === '') {
    errors.postId = 'PostId must not be empty';
  }

  if (commentId.trim() === '') {
    errors.commentId = 'CommentId must not be empty';
  }

  return errors;
};
