import { gql } from 'apollo-server-express';
import { dateScalar } from '../scalars/date';

export const commonSchema = gql`
  scalar Date

  type PageInfo {
    limit: Int!
    offset: Int!
  }

  input Page {
    limit: Int!
    offset: Int!
  }
`;
