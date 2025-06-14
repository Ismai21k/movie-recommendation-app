const mongoose = require('mongoose');


const movieSchema = new mongoose.Schema({
    title: {type: String, require:true},
    genre:[String],
    releaseDate: Date,
    rating: Number,
    overview: String,
    posterPath: String,
    createdBy:{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}

});


module.exports = mongoose.model('Movie', movieSchema);