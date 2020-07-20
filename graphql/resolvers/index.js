const postsResolvers = require('./blog/posts');
const usersResolvers = require('./blog/users');
const commentsResolvers = require('./blog/comments');

const pollResolvers = require('./poll/poll');

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
  Query: { ...postsResolvers.Query, ...usersResolvers.Query, ...pollResolvers.Query, },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation,
    ...pollResolvers.Mutation,
  },
  Subscription: {
    ...postsResolvers.Subscription,
    ...commentsResolvers.Subscription,
  },
};
