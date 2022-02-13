const mongoose = require('mongoose');
const linkValidator = require('validator/lib/isURL');
const errors = require('../constants/errors');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true,
    validator(link) {
      return linkValidator(link);
    }
  },
  image: {
    type: String,
    required: true,
    validator(image) {
      return linkValidator(image);
    }
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
    select: false
  }
});

articleSchema.statics.checkIfOwner = function checkIfOwner(
  articleId,
  requestUserId
) {
  return this.findOne({ _id: `${articleId}` })
    .select('+owner')
    .then((result) => {
      if (!result) return Promise.reject(errors.articleNotFound);

      if (result.owner.valueOf() !== requestUserId) {
        return Promise.reject(errors.notOwner);
      }
      return result;
    });
};

module.exports = mongoose.model('Article', articleSchema);
