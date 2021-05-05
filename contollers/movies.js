/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"]}] */
const Movie = require('../models/movies');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year,
    description, image, trailer, nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  Movie.create({
    // eslint-disable-next-line max-len
    country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, owner: req.user._id, movieId,
  })
    .then((movie) => {
      res.send({ data: movie });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Ошибка валидации данных');
      }
    })
    .catch(next);
};

module.exports.deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFoundError('Запрашиваемый фильм не найден');
    })
    .then((movie) => {
      if (movie.owner.equals(req.user._id)) {
        Movie.findByIdAndRemove(req.params.movieId)
          .then((movie) => {
            res.send(movie);
          })
          .catch((err) => {
            if (err.name === 'CastError') {
              throw new BadRequestError('Ошибка валидации данных');
            }
          });
      } else {
        throw new ForbiddenError('Нельзя удалять чужие фильмы');
      }
      return res.status(200).send({ movie });
    })
    .catch(next);
};
