import { gql } from 'apollo-server-express';

export const typeDefinitions = gql`
  type Query {
    hello: String!
  }
`;
