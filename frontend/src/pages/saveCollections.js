import { useState, useEffect } from "react";
import API from "../api";

const SaveCollections = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const storeUser = localStorage.getItem("user");
    const parseUser = JSON.parse(storeUser);

    const getMovieDetails = async () => {
      try {
        const res = await API.get(`/getcollection/${parseUser.id}`);
        setMovies(res.data);
      } catch (err) {
        console.error("Failed to fetch saved movies:", err);
      }
    };

    if (parseUser?.id) {
      getMovieDetails();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">🎬 Saved Collections</h1>

        {movies.length === 0 ? (
          <p className="text-center text-gray-400">You have no saved movies yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {movies.map((movie) => (
              <div
                key={movie._id}
                className="bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition duration-300 p-4"
              >
                <h2 className="text-lg font-semibold mb-2">{movie.title}</h2>
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.posterPath}`}
                  alt={movie.title}
                  className="w-full h-auto rounded mb-4"
                />
                <p className="text-sm mb-2"><strong>Overview:</strong> {movie.overview}</p>
                <p className="text-sm"><strong>Genres:</strong> {movie.genre.join(", ")}</p>
                <p className="text-sm"><strong>Release Date:</strong> {movie.releaseDate}</p>
                <p className="text-sm"><strong>TMDB Rating:</strong> ⭐ {movie.rating}</p>
                <p className="text-sm"><strong>Likes:</strong> 👍 {movie.likes}</p>
                <p className="text-sm"><strong>Review:</strong> 📝 {movie.review}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SaveCollections;
