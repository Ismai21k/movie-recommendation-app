import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <nav className="bg-gray-900 text-white flex flex-wrap items-center justify-between px-6 py-4 shadow-md">
      {/* Logo */}
      <div className="text-2xl font-bold">🎬 MovieApp</div>

      {/* Navigation Links */}
      <div className="flex gap-4 items-center">
        <Link
          to="/home"
          className="text-white hover:text-red-500 transition-colors duration-300"
        >
          Home
        </Link>
        {user && (
          <Link
            to={`/getcollection/${user.id}`}
            className="text-white hover:text-red-500 transition-colors duration-300"
          >
            My Collection
          </Link>
        )}
      </div>

      {/* Logout / Login */}
      <div className="flex gap-4 items-center">
        <Link
          to="/"
          className="text-white hover:text-red-500 transition-colors duration-300"
        >
          Logout
        </Link>
        <div className="text-sm sm:text-base">
          {user ? (
            <span className="text-gray-300">👤 {user.username}</span>
          ) : (
            <Link
              to="/login"
              className="text-white hover:text-red-500 transition-colors duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
