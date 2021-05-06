const mongoose = require('mongoose');
const validate = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validate.isURL(v);
      },
      message: ({ value }) => `${value} - некорректная ссылка`,
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validate.isURL(v);
      },
      message: ({ value }) => `${value} - некорректная ссылка`,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validate.isURL(v);
      },
      message: ({ value }) => `${value} - некорректная ссылка`,
    },
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model('movie', movieSchema);
