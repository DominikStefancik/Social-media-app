import { gql } from '@apollo/client';

export const POSTS_QUERY = gql`
  query Posts {
    posts {
      id
      text
      createdAt
      lastUpdated
      author {
        id
        username
      }
      comments {
        id
        text
        createdAt
        author {
          id
          username
        }
      }
      likes
    }
  }
`;
