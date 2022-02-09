const jwt = require('jsonwebtoken');
require('dotenv').config();
const { authorizationError } = require('../constants/errors');

const { JWT_KEY, NODE_ENV } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return Promise.reject(authorizationError);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_KEY : 'placeholder'
    );
  } catch (err) {
    return Promise.reject(authorizationError);
  }
  req.user = payload;

  return next();
};
