const Article = require('../models/article');

module.exports.fetchArticles = (req, res, next) => {
  Article.find({})
    .populate('owner')
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

module.exports.newArticle = (req, res) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  console.log(req.user);
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
    Article.findOne(article).then((foundArticle) =>
      res.status(201).send(foundArticle)
    );
  });
};

module.exports.deleteArticle = (req, res, next) => {
  const articleId = req.params.id;
  Article.checkIfOwner(articleId, req.user._id)
    .then((item) =>
      Article.deleteOne(item).then(
        res.send({ message: 'Deleted successfully' })
      )
    )
    .catch(next);
};
