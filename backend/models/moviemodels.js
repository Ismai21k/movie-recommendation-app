const mongoose = require('mongoose');


const movieSchema = new mongoose.Schema({
    tmdbId: {
    type: Number,
    required: true,
    unique: true, // Optional: avoid duplicates
    },
    title: {type: String, require:true},
    genre:[String],
    releaseDate: Date,
    rating: Number,
    likes: {type: Number, default: 0},
    review: String,
    posterPath: String,
    createdBy:{ type: mongoose.Schema.Types.ObjectId, ref: 'User'},


}, {timestamps: true});
movieSchema.index({ tmdbId: 1, createdBy: 1 }, { unique: true }); // ✅ Composite index

module.exports = mongoose.model('Movie', movieSchema);