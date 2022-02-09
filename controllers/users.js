const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_KEY, NODE_ENV } = process.env;
require('dotenv').config();

module.exports.register = (req, res, next) => {
  User.encryptAndCreateUser(req.body)
    .then((user) => {
      res.status(201).send({ data: user });
    })
    .catch(next);
};
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      console.log(user);
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_KEY : 'placeholder',
        { expiresIn: '7h' }
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports.fetchUsers = (req, res, next) => {
  User.find()
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.fetchSelf = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .orFail(() => {
      throw errors.userNotFound;
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};
