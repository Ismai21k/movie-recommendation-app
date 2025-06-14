const Movie = require('../models/moviemodels');

exports.addMovie = async (req, res) => {
    try {
        const movie = new Movie({ ...req.body, createdBy: req.body._id });
        await movie.save();
        res.status(201).json({ message: 'movie added successfully', movie })
    } catch (err) {
        res.status(500).json({ error: err.message})
    }
};
exports.getmovie = async (req, res) => {
    try {
        const movie = await Movie.find().sort({ releaseDate: -1});
        res.status(201).json(movie)

    } catch (err) {
        console.log(err.message)
    }
};

exports.getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.send(movie)
        
    } catch (err) {
        console.log(err.message)
    }
};



