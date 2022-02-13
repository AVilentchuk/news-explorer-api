const router = require('express').Router();

const auth = require('../middleware/auth');
const { register, login } = require('../controllers/users');
const articles = require('./articles');
const users = require('./users');
const { signinValidator, signupValidator } = require('../middleware/validator');

router.post('/signup', signupValidator, register);
router.post('/signin', signinValidator, login);
router.use('/articles', auth, articles);
router.use('/users', auth, users);

module.exports = router;
