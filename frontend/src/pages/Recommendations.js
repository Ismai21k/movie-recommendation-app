import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api';
import Navbar from '../components/Navbar';

const Recommendations = () => {
  const { tmdbId } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const res = await API.get(`/movies/recommmend/${tmdbId}`);
      setMovies(res.data);
    };
    fetchRecommendations();
  }, [tmdbId]);

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 text-white min-h-screen px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">🎯 Recommended Movies</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-center">
            {movies.map(movie => (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
                className="bg-gray-800 hover:bg-gray-700 rounded p-3 transition duration-200 shadow"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded w-full h-auto"
                />
                <p className="mt-2 text-center text-sm">{movie.title}</p>
              </Link>
            ))}
          </div>

          {movies.length === 0 && (
            <p className="text-center text-gray-400 mt-10">No recommendations available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Recommendations;
