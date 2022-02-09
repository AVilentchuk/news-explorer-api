const mongoose = require('mongoose');
const mailValidator = require('validator/lib/isEmail');
const bcrypt = require('bcrypt');
const errors = require('../constants/errors');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return mailValidator(email);
      }
    }
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8
  },
  name: {
    type: String,
    // set: handleSpaces,
    required: true,
    minlength: 2,
    maxlength: 30
  }
});
// function handleSpaces(val) {
//   return Regex.Replace(val, '\\s+', '');
// }
userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(errors.validationError);
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(errors.validationError);
        }
        return user;
      });
    });
};

userSchema.statics.encryptAndCreateUser = function encryptAndCreateUser({
  name,
  email,
  password
}) {
  return bcrypt.hash(password, 10).then((hash) =>
    this.create({
      name,
      email,
      password: hash
    })
      .then((user) => this.findOne(user))
      .catch((err) => {
        if (err.code === 11000) return Promise.reject(errors.usedEmail);
        return err;
      })
  );
};

module.exports = mongoose.model('User', userSchema);
