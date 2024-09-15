import React, { useState } from 'react';
import useAuth from '../Hooks/useAuth';

const Home: React.FC = () => {
  const { login, error } = useAuth(); 
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    await login(email, password);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-jade-700 to-jade-900">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-jade-900 mb-8 transition duration-300 ease-in-out transform hover:scale-105">
          User Tango APP
        </h1>
        <div className="space-y-6">
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-jade-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-jade-900 bg-gray-50 border border-jade-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-jade-400 transition duration-300 ease-in-out"
              placeholder="Ingresa tu email"
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-jade-600">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-jade-900 bg-gray-50 border border-jade-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-jade-400 transition duration-300 ease-in-out"
              placeholder="********"
            />
          </div>
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </div>
        <div className="mt-6">
          <button
            onClick={handleLogin}
            className="w-full py-2 bg-jade-500 text-white font-bold rounded-md shadow-lg hover:bg-jade-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-jade-300"
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
