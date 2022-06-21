import { gql } from 'apollo-server-express';

export const mutationsSchema = gql`
  type Mutation {
    createUser(data: CreateUserData!): User!
    loginUser(data: LoginUserData!): User!
    deleteUser(selector: UserSelector!): Boolean!
    createPost(data: CreatePostData!): Post!
    deletePost(selector: PostSelector!): Boolean!
    deletePosts(filter: PostFilter!): Boolean!
    createComment(data: CreateCommentData!): Post!
    deleteComment(selector: CommentSelector!): Post!
    likePost(selector: PostSelector!): Post!
  }
`;
