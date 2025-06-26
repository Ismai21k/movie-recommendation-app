const express = require('express');
const router = express.Router();
const protect = require('../middkeware/authMiddleware')
const {
  searchMovies,
  getMovieDetails,
  getPopularMovies,
  saveTMDBMovie,
  recommendMovies,
  likeMovie,
  reviewMovie,
  rateMovie,
  getCollection,
  getGenres
} = require('../controllers/tmdbController');


router.get('/getcollection/:id', getCollection)
router.get('/search', protect, searchMovies);          // /api/tmdb/search?query=batman
router.get('/movie/:id', protect, getMovieDetails);    // /api/tmdb/movie/1234
router.get('/popular', getPopularMovies);     // /api/tmdb/popular
router.get('/genres', getGenres)
router.post('/savemovie', protect, saveTMDBMovie);
router.get('/movies/recommmend/:tmdbId', recommendMovies)
router.patch('/movies/:id/like',  likeMovie);
router.patch('/movies/:id/review', reviewMovie);
router.patch('/movies/:id/rating',  rateMovie);

module.exports = router;
