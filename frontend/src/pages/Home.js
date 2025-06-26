import React, { useState, useEffect } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [popular, setPopular] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [genres, setGenres] = useState([]);
  const [language, setLanguage] = useState('en');
  const [year, setYear] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined') {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }

    fetchGenres();
  }, []);

  useEffect(() => {
    fetchPopularMovies();
  }, [page, language, year]);

  const fetchPopularMovies = async () => {
    try {
      const res = await API.get(`/popular?page=${page}&language=${language}&year=${year}`);
      setPopular(res.data.results);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Failed to load popular movies:', err.message);
    }
  };

  const fetchGenres = async () => {
    try {
      const res = await API.get('/genres');
      setGenres(res.data.genres);
    } catch (err) {
      console.error('Failed to load genres:', err.message);
    }
  };

  const search = async () => {
    try {
      const res = await API.get(`/search?query=${query}`);
      setResults(res.data);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const getGenreNames = (genreIds) => {
    return genreIds.map(id => {
      const found = genres.find(g => g.id === id);
      return found ? found.name : '';
    }).join(', ');
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white px-4 py-6">
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user ? user.email : 'Guest'}</h1>

        {/* Search Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter movie title"
            className="bg-gray-800 text-white px-4 py-2 rounded w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            onClick={search}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
          >
            Search
          </button>
        </div>

        {/* Collection Link */}
        {user && (
          <div className="mb-4">
            <Link to={`/getcollection/${user.id}`}>
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition">
                My Saved Collections
              </button>
            </Link>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <select
            onChange={(e) => setLanguage(e.target.value)}
            value={language}
            className="bg-gray-800 text-white px-3 py-2 rounded"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="fr">French</option>
            <option value="ja">Japanese</option>
          </select>

          <select
            onChange={(e) => setYear(e.target.value)}
            value={year}
            className="bg-gray-800 text-white px-3 py-2 rounded"
          >
            <option value="">Any Year</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
        </div>

        {/* Search Results */}
        {results.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mb-3">Search Results</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
              {results.map((movie) => (
                <Link
                  key={movie.id}
                  to={`/movie/${movie.id}`}
                  className="bg-gray-800 hover:bg-gray-700 rounded p-2 transition"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-auto rounded"
                  />
                  <p className="mt-2 text-center">{movie.title}</p>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* Popular Movies */}
        <h2 className="text-xl font-semibold mb-3">🔥 Popular Movies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {popular.map((movie) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              className="bg-gray-800 hover:bg-gray-700 rounded p-2 transition"
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto rounded"
              />
              <div className="mt-2 text-sm text-center">
                <p className="font-medium">{movie.title}</p>
                <p className="text-gray-400">Genres: {getGenreNames(movie.genre_ids)}</p>
                <p className="text-yellow-400">⭐ {movie.vote_average}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
          >
            ◀ Prev
          </button>
          <span className="text-sm">Page {page}</span>
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
          >
            Next ▶
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
