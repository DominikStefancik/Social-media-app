import { gql } from 'apollo-server-express';

export const postTypes = gql`
  type Post {
    id: ID!
    author: User
    text: String!
    createdAt: Date!
    lastUpdated: Date
    comments: [Comment!]!
    likes: [String!]!
  }

  type PostFeed {
    items: [Post!]!
    pageInfo: PageInfo
    totalCount: Int!
  }

  type Comment {
    id: ID!
    author: User!
    text: String!
    createdAt: Date!
  }
`;
