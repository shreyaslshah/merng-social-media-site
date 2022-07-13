const { AuthenticationError, UserInputError } = require('apollo-server');
const Post = require('../../models/Post');
const checkAuth = require('../../util/checkAuth');

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },

    async getPost(_, { postID }) {
      try {
        const post = await Post.findById(postID);
        if (post) {
          return post;
        } else {
          throw new Error('post not found');
        }
      }
      catch (error) {
        throw new Error(error);
      }
    }
  },
  Mutation: {
    async createPost(_, { body }, context) {
      const user = checkAuth(context);

      if (body.trim() === '') {
        throw new Error('post must not be empty');
      }

      const newPost = new Post({
        body,
        username: user.username,
        createdAt: new Date().toISOString()
      });

      const post = await newPost.save();

      return post;
    },

    async deletePost(_, { postID }, context) {
      const user = checkAuth(context);

      try {
        const post = await Post.findById(postID);
        if (user.username == post.username) {
          await post.delete();
          return 'post deleted successfully';
        } else {
          throw new AuthenticationError('action not allowed');
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    async createComment(_, { postID, body }, context) {
      const user = checkAuth(context);

      if (body.trim() === '') {
        throw new UserInputError('empty comment');
      }

      try {
        const post = await Post.findById(postID);

        if (post) {
          post.comments.unshift({
            body,
            username: user.username,
            createdAt: new Date().toISOString()
          })
          await post.save();
          return post;
        } else {
          throw new UserInputError('post not found');
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    async deleteComment(_, { postID, commentID }, context) {
      const user = checkAuth(context);

      try {
        const post = await Post.findById(postID);
        if (post) {
          const commentIndex = post.comments.findIndex(c => c.id === commentID);
          if (post.comments[commentIndex].username === user.username) {
            post.comments.splice(commentIndex, 1);
            await post.save();
            return post;
          } else {
            throw new AuthenticationError('action not allowed');
          }
        } else {
          throw new UserInputError('post not found');
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    async likePost(_, { postID }, context) {
      const user = checkAuth(context);

      const post = await Post.findById(postID);
      if (post) {
        if (post.likes.find(like => like.username === user.username)) {
          post.likes = post.likes.filter(like => like.username !== user.username);
        } else {
          post.likes.push({
            username: user.username,
            createdAt: new Date().toISOString()
          })
        }
        await post.save();
        return post;
      } else {
        throw new UserInputError('post not found');
      }
    }
  }
}