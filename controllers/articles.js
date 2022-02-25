const Article = require('../models/article');
const errors = require('../constants/errors');

module.exports.fetchArticles = (req, res, next) => {
  Article.find({})
    .populate('owner')
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

module.exports.newArticle = (req, res) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image
  } = req.body;

  const owner = req.user._id;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner
  }).then((article) => {
    Article.findOne(article).then((foundArticle) => res.status(201).send(foundArticle));
  });
};

module.exports.deleteArticleByCredentials = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image
  } = req.body;

  const owner = req.user._id;
  Article.findOneAndDelete({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner
  })
    .then(res.status(200).send({ message: 'Deleted successfully' }))
    .orFail(() => Promise.reject(errors.articleNotFound))
    .catch(next);
};
module.exports.deleteArticle = (req, res, next) => {
  const articleId = req.params.id;
  Article.checkIfOwner(articleId, req.user._id)
    .then((item) => Article.deleteOne(item)
      .then(res.send({ message: 'Deleted successfully' })))
    .catch(next);
};
