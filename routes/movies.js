const router = require('express').Router();

const {
  getMovies, createMovie, deleteMovieById,
} = require('../contollers/movies');

router.get('/', getMovies);

router.post('/', createMovie);

router.delete('/:movieId', deleteMovieById);

module.exports = router;
