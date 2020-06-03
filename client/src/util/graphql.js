import gql from 'graphql-tag';

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
      user {
        id
        email
        token
        username
        createdAt
      }
    }
  }
`;

export const SUB_POSTS = gql`
  subscription onPostAdded {
    newPost {
      id
      body
      createdAt
      username
      comments {
        id
        createdAt
        username
        body
      }
      likes {
        id
        createdAt
        username
      }
      likeCount
      commentCount
      user {
        id
        email
        token
        username
        createdAt
      }
    }
  }
`;
