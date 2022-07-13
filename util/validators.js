const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports.validateRegisterInput = async (username, email, password) => {

  const errors = {};

  if (username.trim() === '') {
    errors.username = 'username is empty'
  }
  else {
    const user = await User.findOne({ username });
    if (user) {
      errors.username = 'username is taken';
    }
  }

  if (email.trim() === '') {
    errors.email = 'email is empty'
  }
  else {
    const regularExpressionEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!email.match(regularExpressionEmail)) {
      errors.email = 'invalid email';
    }
  }

  if (password.trim() === '') {
    errors.password = 'password is empty'
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}

module.exports.validateLoginInput = async (username, password) => {
  const errors = {};
  var user = null;

  if (username.trim() === '') {
    errors.username = 'username is empty'
  }
  else {
    user = await User.findOne({ username });
    if (!user) {
      errors.username = 'user not found';
    }
  }

  if (password.trim() === '') {
    errors.password = 'password is empty'
  }
  else {
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.password = 'wrong password';
      }
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
    user
  }
}