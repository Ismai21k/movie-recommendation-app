import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api';
import Navbar from '../components/Navbar';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [message, setMessage] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(1);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await API.get(`/movie/${id}`);
      setMovie(res.data);
    };
    fetchDetails();
  }, [id]);

  const handleSave = async () => {
    try {
      const storeUser = localStorage.getItem('user');
      const parseUser = JSON.parse(storeUser);

      const res = await API.post('/savemovie', { tmdbId: id, createdBy: parseUser.id });
      setMessage('✅ Saved to your collection!');
    } catch (err) {
      setMessage('❌ Failed to save. Maybe already saved?');
    }
  };

  const handleLike = async () => {
    try {
      const res = await API.patch(`/movies/${movie.id}/like`);
      setLikeCount(res.data.likes);
      setMessage('👍 Liked!');
    } catch (err) {
      setMessage('❌ Failed to like — save the collection first');
    }
  };

  const handleReview = async () => {
    try {
      const res = await API.patch(`/movies/${movie.id}/review`, { review });
      setMessage('📝 Review submitted');
    } catch (err) {
      setMessage('❌ Failed to submit review — save the collection first');
    }
  };

  const handleRating = async () => {
    try {
      const res = await API.patch(`/movies/${movie.id}/rating`, { rating });
      setMessage('⭐ Rating submitted');
    } catch (err) {
      setMessage('❌ Failed to rate — save the collection first');
    }
  };

  if (!movie) return <p className="text-center text-white mt-8">Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 text-white min-h-screen px-4 py-8">
        <div className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">{movie.title}</h2>

          <img
            src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
            alt={movie.title}
            className="w-full rounded-lg mb-4"
          />

          <p className="mb-2"><strong>Overview:</strong> {movie.overview}</p>
          <p className="mb-2"><strong>Genres:</strong> {movie.genres.map(g => g.name).join(', ')}</p>
          <p className="mb-2"><strong>Release Date:</strong> {movie.release_date}</p>
          <p className="mb-4"><strong>TMDB Rating:</strong> ⭐ {movie.vote_average}</p>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 mb-4">
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition"
            >
              💾 Save to My Collection
            </button>
            <button
              onClick={handleLike}
              className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded transition"
            >
              👍 Like
            </button>
            <span className="text-yellow-400 self-center">Likes: {likeCount}</span>
          </div>

          {/* Rating */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-2">⭐ Rate this Movie</h4>
            <div className="flex gap-3 items-center">
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="bg-gray-700 text-white px-3 py-2 rounded"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
              <button
                onClick={handleRating}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition"
              >
                Submit Rating
              </button>
            </div>
          </div>

          {/* Review */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-2">📝 Write a Review</h4>
            <textarea
              placeholder="Write your thoughts..."
              rows={4}
              className="w-full p-3 bg-gray-700 text-white rounded mb-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
            <button
              onClick={handleReview}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded transition"
            >
              Submit Review
            </button>
          </div>

          {/* Message */}
          {message && (
            <p className="mt-4 text-green-400 font-medium">{message}</p>
          )}

          {/* Recommendation Link */}
          <div className="mt-6 text-center">
            <Link
              to={`/recommend/${movie.id}`}
              className="text-blue-400 hover:underline"
            >
              See Recommendations →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
