import { gql } from 'apollo-server-express';

export const schema = gql`
  scalar Date

  type User {
    id: ID!
    username: String!
    password: String!
    email: String!
    createdAt: Date!
    lastUpdated: Date
    token: String
  }

  input UserSelector {
    id: ID
    username: String
  }

  input UserFilter {
    id_in: [ID!]
    username_in: [String!]
  }

  input CreateUserData {
    username: String!
    password: String!
    confirmedPassword: String!
    email: String!
  }

  input LoginUserData {
    username: String!
    password: String!
  }

  type Post {
    id: ID!
    author: User!
    text: String!
    createdAt: Date!
    lastUpdated: Date
    comments: [Comment!]!
    likes: [String!]!
  }

  input PostSelector {
    id: ID
  }

  input PostFilter {
    id_in: [ID!]
    authorId: ID
    authorId_in: [ID!]
    createdFrom: Date
    createdTo: Date
  }

  input CreatePostData {
    text: String!
  }

  type Comment {
    id: ID!
    author: User!
    text: String!
    createdAt: Date!
  }

  input CommentSelector {
    postId: ID!
    commentId: ID!
  }

  input CreateCommentData {
    postId: ID!
    text: String!
  }

  type Query {
    user(selector: UserSelector!): User
    users(filter: UserFilter): [User!]!
    post(selector: PostSelector!): Post
    posts(filter: PostFilter): [Post!]!
  }

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
