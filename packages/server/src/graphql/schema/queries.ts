import { gql } from 'apollo-server-express';

export const queriesSchema = gql`
  type Query {
    user(selector: UserSelector!): User
    users(filter: UserFilter): [User!]!
    post(selector: PostSelector!): Post
    posts(filter: PostFilter, page: Page): PostFeed!
  }
`;
