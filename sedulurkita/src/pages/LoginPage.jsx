import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  useDocumentTitle("Masuk - SedulurKita");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/list'); // Arahkan ke halaman list setelah login
    } catch (err) {
      setError('Gagal login. Periksa kembali email dan password Anda.');
    }
  };

  return (
    <div className="container mx-auto max-w-md px-4 py-20">
      <div className="bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#DA9A3D] text-white font-semibold rounded-lg hover:bg-yellow-700"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-6">
          Belum punya akun?{' '}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
}