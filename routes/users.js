const router = require('express').Router();
const { fetchSelf, fetchUsers } = require('../controllers/users');

// router.get('/',validator , function);
router.get('/', fetchUsers);
router.get('/me', fetchSelf);

module.exports = router;
