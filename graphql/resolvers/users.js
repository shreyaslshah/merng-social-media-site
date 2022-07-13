const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');
const { validateRegisterInput, validateLoginInput } = require('../../util/validators');

module.exports = {
  Mutation: {
    async register(_, { registerInput: { username, email, password } }, context, info) {

      const { errors, isValid } = await validateRegisterInput(username, email, password);

      if (!isValid) {
        throw new UserInputError('errors', { errors });
      }

      password = await bcrypt.hash(password, 12);
      const user = new User({
        username,
        email,
        password,
        createdAt: new Date().toISOString()
      })

      const res = await user.save();

      const token = jwt.sign({
        id: res.id,
        email: res.email,
        username: res.username
      }, 'MySecretKey', { expiresIn: '1h' })

      return {
        id: res._id,
        username: res.username,
        email: res.email,
        token,
        createdAt: res.createdAt
      }
    },

    async login(_, { username, password }) {
      const { errors, isValid, user } = await validateLoginInput(username, password);

      if (!isValid) {
        throw new UserInputError('errors', { errors });
      }

      const token = jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
      }, 'MySecretKey', { expiresIn: '1h' })

      return {
        id: user._id,
        username: user.username,
        email: user.email,
        token,
        createdAt: user.createdAt
      }
    }
  }
}