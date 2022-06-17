import { gql } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser(
    $username: String!
    $password: String!
    $confirmedPassword: String!
    $email: String!
  ) {
    createUser(
      data: {
        username: $username
        password: $password
        confirmedPassword: $confirmedPassword
        email: $email
      }
    ) {
      id
      username
      email
      token
    }
  }
`;

export const LOGIN_USER_MUTATION = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(data: { username: $username, password: $password }) {
      id
      username
      email
      token
    }
  }
`;

export const CREATE_POST_MUTATION = gql`
  mutation CreatePost($text: String!) {
    createPost(data: { text: $text }) {
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

export const LIKE_POST_MUTATION = gql`
  mutation LikePost($id: ID!) {
    likePost(selector: { id: $id }) {
      id
      likes
    }
  }
`;

export const DELETE_POST_MUTATION = gql`
  mutation DeletePost($id: ID!) {
    deletePost(selector: { id: $id })
  }
`;

export const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment($postId: ID!, $text: String!) {
    createComment(data: { postId: $postId, text: $text }) {
      id
      comments {
        id
        text
        createdAt
        author {
          id
          username
        }
      }
    }
  }
`;

export const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(selector: { postId: $postId, commentId: $commentId }) {
      id
      comments {
        id
        text
        createdAt
        author {
          id
          username
        }
      }
    }
  }
`;
