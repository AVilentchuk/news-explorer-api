const { celebrate, Joi } = require('celebrate');

module.exports.signin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(),
    name: Joi.string().required().min(2).max(30).alphanum()
  })
});

module.exports.articleValidator = celebrate({
  body: Joi.object()
    .keys({
      keyword: Joi.string().required(),
      title: Joi.string().required(),
      text: Joi.string().required(),
      date: Joi.string().required().isoDate(),
      source: Joi.string().required(),
      link: Joi.string().required().uri(),
      image: Joi.string().required().uri()
    })
    .unknown(true)
});

module.exports.articleAction = celebrate({
  params: Joi.object({
    id: Joi.string().hex().length(24).required()
  }),
  body: Joi.object()
    .keys({
      _id: Joi.string().hex().length(24)
    })
    .unknown(true)
});
