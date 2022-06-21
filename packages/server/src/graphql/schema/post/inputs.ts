import { gql } from 'apollo-server-express';

export const postInputs = gql`
  input PostSelector {
    id: ID
  }

  input PostFilter {
    id_in: [ID!]
    authorId: ID
    authorId_in: [ID!]
    createdFrom: Date
    createdTo: Date
  }

  input CreatePostData {
    text: String!
  }

  input CommentSelector {
    postId: ID!
    commentId: ID!
  }

  input CreateCommentData {
    postId: ID!
    text: String!
  }
`;
