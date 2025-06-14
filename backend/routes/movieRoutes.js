const express = require('express');
const router = express.Router();
const { addMovie, getmovie, getMovieById } = require('../controllers/movieController');


router.post('/addmovie', addMovie);
router.get('/getmovie', getmovie);
router.get('/getmovie/:id', getMovieById);


module.exports = router;