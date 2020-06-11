const postsResolvers = require('./blog/posts');
const usersResolvers = require('./blog/users');
const commentsResolvers = require('./blog/comments');

const blobsResolvers = require('./blobs/blobs');

const User = require('../../models/User');

module.exports = {
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
    async user(parent) {
      const user = await User.findById(parent.user);
      return user;
    },
  },
  Query: { ...postsResolvers.Query, ...usersResolvers.Query },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation,
    ...blobsResolvers.Mutation,
  },
  Subscription: {
    ...postsResolvers.Subscription,
    ...commentsResolvers.Subscription,
    ...blobsResolvers.Subscription,
  },
};
