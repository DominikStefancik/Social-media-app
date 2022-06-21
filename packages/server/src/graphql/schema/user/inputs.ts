import { gql } from 'apollo-server-express';

export const userInputs = gql`
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
`;
