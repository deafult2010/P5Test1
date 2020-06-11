const gql = require('graphql-tag');

module.exports = gql`
  # Blog type defs
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
    user: User
  }
  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }
  type User {
    id: ID!
    email: String!
    token: String
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  # Blobs type defs
  type Tick {
    id: ID!
    blobs: String!
    foods: String!
    tickTime: String!
  }

  type Query {
    # Blog Queries
    getPosts: [Post]
    getPost(postId: ID!): Post
    getUsers: [User]
    getUser(userId: ID!): User
  }
  type Mutation {
    # Blog Muts
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!

    # Blobs Muts
    blobsTick(blobsPos: String!, foodsPos: String!): Tick!
  }
  type Subscription {
    # Blog Subs
    newPost: Post!
    delPost: Post!
    likePost: Post!
    newComment: Post!
    delComment: Post!
    countComment: Post!

    # Blobs Subs
    gameTick: Tick!
  }
`;
