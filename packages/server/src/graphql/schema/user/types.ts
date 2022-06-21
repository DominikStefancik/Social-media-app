import { gql } from 'apollo-server-express';

export const userTypes = gql`
  type User {
    id: ID!
    username: String!
    password: String!
    email: String!
    createdAt: Date!
    lastUpdated: Date
    token: String
  }
`;
