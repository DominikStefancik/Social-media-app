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
