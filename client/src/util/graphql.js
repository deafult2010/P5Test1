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

export const SUB_POST_ADDED = gql`
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

export const SUB_POST_DEL = gql`
  subscription onPostDel {
    delPost {
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

export const SUB_POST_LIKE = gql`
  subscription onPostLike {
    likePost {
      id
      likes {
        id
        createdAt
        username
      }
      likeCount
    }
  }
`;

export const SUB_NEW_COMMENT = gql`
  subscription onNewComment {
    newComment {
      id
      comments {
        id
        createdAt
        username
        body
      }
      commentCount
    }
  }
`;

export const SUB_DEL_COMMENT = gql`
  subscription onDelComment {
    delComment {
      id
      comments {
        id
        createdAt
        username
        body
      }
      commentCount
    }
  }
`;

export const SUB_COUNT_COMMENT = gql`
  subscription onCountComment {
    countComment {
      id
      comments {
        id
        createdAt
        username
        body
      }
      commentCount
    }
  }
`;
