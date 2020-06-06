const { AuthenticationError, UserInputError } = require('apollo-server');

const checkAuth = require('../../util/check-auth');
const Post = require('../../models/Post');

module.exports = {
  Mutation: {
    createComment: async (parent, { postId, body }, context) => {
      const { username } = checkAuth(context);
      if (body.trim() === '') {
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comment body required',
          },
        });
      }

      const post = await Post.findById(postId);

      if (post) {
        post.comments.unshift({
          body: body,
          username: username,
          createdAt: new Date().toISOString(),
        });
        await post.save();

        context.pubsub.publish('NEW_COMMENT', {
          newComment: post,
        });
        // Update comment count on Home Page in real time
        context.pubsub.publish('COUNT_COMMENT', {
          countComment: post,
        });

        return post;
      } else throw new UserInputError('Post not found');
    },

    deleteComment: async (parent, { postId, commentId }, context) => {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);

      if (post) {
        const commentIndex = post.comments.findIndex((c) => c.id === commentId);

        if (post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1);
          await post.save();

          context.pubsub.publish('DEL_COMMENT', {
            delComment: post,
          });
          // Update comment count on Home Page in real time
          context.pubsub.publish('COUNT_COMMENT', {
            countComment: post,
          });

          return post;
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } else {
        throw new UserInputError('Post not found');
      }
    },
  },
  Subscription: {
    newComment: {
      subscribe: (parent, args, { pubsub }) =>
        pubsub.asyncIterator('NEW_COMMENT'),
    },
    delComment: {
      subscribe: (parent, args, { pubsub }) =>
        pubsub.asyncIterator('DEL_COMMENT'),
    },
    countComment: {
      subscribe: (parent, args, { pubsub }) =>
        pubsub.asyncIterator('COUNT_COMMENT'),
    },
  },
};
