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

export const POST_QUERY = gql`
  query Post($id: ID) {
    post(selector: { id: $id }) {
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
