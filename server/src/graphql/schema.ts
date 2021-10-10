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
  input CreateUserData {
    username: String!
    password: String!
    confirmedPassword: String!
    email: String!
  }

  type Query {
    user(selector: UserSelector): User
  }

  type Mutation {
    createUser(data: CreateUserData): User!
  }
`;
