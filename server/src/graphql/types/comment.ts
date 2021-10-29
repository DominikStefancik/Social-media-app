export interface CommentSelector {
  postId: string;
  commentId: string;
}

export interface CreateCommentData {
  postId: string;
  text: string;
}
