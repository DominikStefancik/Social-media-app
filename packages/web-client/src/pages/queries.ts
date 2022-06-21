import { gql } from '@apollo/client';

export const POSTS_BATCH_QUERY = gql`
  query Posts($offset: Int!, $limit: Int!) {
    posts(page: { offset: $offset, limit: $limit }) {
      items {
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
      pageInfo {
        limit
        offset
      }
      totalCount
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
