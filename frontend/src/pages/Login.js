import React, { useState } from 'react';
import API from '../api';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      alert('Login successful!');
      navigate('/home');
    } catch (err) {
      alert('Login failed');
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <div className="w-full max-w-sm bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              placeholder="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              autoComplete="email"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <input
              placeholder="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              autoComplete="current-password"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 transition-colors px-4 py-2 rounded font-medium"
          >
            Login
          </button>
        </form>

        {/* ✅ Styled Register Link */}
        <p className="text-sm text-center text-gray-400 mt-4">
          Don’t have an account?{' '}
          <Link
            to="/register"
            className="text-blue-400 hover:underline hover:text-blue-300 transition"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
