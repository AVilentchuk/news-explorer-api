const router = require('express').Router();
const { articleValidator, articleAction } = require('../middleware/validator');
const {
  newArticle,
  fetchArticles,
  deleteArticle
} = require('../controllers/articles');

// router.get('/',validator , function);
router.get('/', fetchArticles);
router.post('/', articleValidator, newArticle);
router.delete('/:id', articleAction, deleteArticle);

module.exports = router;
