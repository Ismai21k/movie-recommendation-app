const axios = require('axios');
const TMDB_API_KEY = process.env.TMDB_API_KEY || 5000;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const Movie = require('../models/moviemodels');
const mongoose = require('mongoose');


exports.getCollection = async (req, res) => {
  try {
    const userId = req.params._id;
    const movie = await Movie.find(userId);
    res.json(movie)
    
  } catch (error) {
    console.error(error.message)
    
  }
}

// Search Movies
exports.searchMovies = async (req, res) => {
  try {
    const { query } = req.query;
    const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        query
      }
    });
    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch from TMDB', error: error.message });
  }
};

// Get Movie Details
exports.getMovieDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
      params: {
        api_key: TMDB_API_KEY
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get movie details', error: error.message });
  }
};

// GET popular movies with pagination, language, year
exports.getPopularMovies = async (req, res) => {
  try {
    const { page = 1, language = 'en', year } = req.query;

    const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
      params: {
        api_key: TMDB_API_KEY,
        page,
        language,
        ...(year && { primary_release_year: year })
      }
    });

    res.status(200).json({
      results: response.data.results,
      totalPages: response.data.total_pages,
      currentPage: response.data.page
    });
  } catch (error) {
    console.error('Failed to fetch popular movies:', error.message);
    res.status(500).json({ message: 'Failed to get popular movies', error: error.message });
  }
};

// GET genres (used to map genre_ids)
exports.getGenres = async (req, res) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/genre/movie/list`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'en-US'
      }
    });

    res.status(200).json({ genres: response.data.genres });
  } catch (error) {
    console.error('Failed to fetch genres:', error.message);
    res.status(500).json({ message: 'Failed to get genres', error: error.message });
  }
};



exports.saveTMDBMovie = async (req, res) => {
  try {
    const { tmdbId, createdBy } = req.body;

    const response = await axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}`, {
      params: { api_key: process.env.TMDB_API_KEY }
    });

    const data = response.data;

    const newMovie = new Movie({
      tmdbId: data.id,
      title: data.title,
      genre: data.genres.map(g => g.name),
      releaseDate: data.release_date,
      rating: data.vote_average,
      likes: 0,
      overview: data.overview,
      posterPath: data.poster_path,
      createdBy,
      
      
    });
    console.log("Incoming save request body:", req.body);


    await newMovie.save();

    res.status(201).json(newMovie);
  } catch (err) {
    console.log('Error while saving TMD movie:', err)
    res.status(500).json({ message: 'Failed to save TMDB movie', error: err.message });
  }
};

exports.recommendMovies = async (req, res) => {
  try {
    const { tmdbId } = req.params;
    console.log(`recommend id : ${tmdbId}`)

    const response = await axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}/recommendations`, {
      params: { api_key: process.env.TMDB_API_KEY }
    });

    res.json(response.data.results); // Recommended movies from TMDB
  } catch (err) {
    res.status(500).json({ message: 'Failed to get recommendations', error: err.message });
  }
};

exports.likeMovie = async (req, res) => {
  try {
    const movie = await Movie.findOne({tmdbId: parseInt(req.params.id)});
    console.log(movie)
    movie.likes += 1;
    await movie.save();
    res.json({ message: 'Movie liked', likes: movie.likes });
  } catch (err) {
    res.status(500).json({ message: 'Failed to like movie', error: err.message });
  }
};

// 📝 Add or update a review
exports.reviewMovie = async (req, res) => {
  const { review } = req.body;
  try {
    const movie = await Movie.findOne({tmdbId: parseInt(req.params.id)});
    movie.review = review;
    await movie.save();
    res.json({ message: 'Review added', review: movie.review });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add review', error: err.message });
  }
};

// ⭐ Add or update rating
exports.rateMovie = async (req, res) => {
  const { rating } = req.body;
  if (rating < 1 || rating > 5) return res.status(400).json({ message: 'Rating must be between 1 and 5' });

  try {
    const movie = await Movie.findOne({tmdbId: parseInt(req.params.id)});
    movie.userRating = rating;
    await movie.save();
    res.json({ message: 'Rating saved', rating: movie.userRating });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save rating', error: err.message });
  }
};
