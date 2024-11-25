import React, { useState } from 'react';
import PhoneCart from '../assets/PhoneCart.svg';

const LoginPage = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/loginPage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const responseData = await response.json();
      setLoading(false);

      if (response.ok) {
        localStorage.setItem('token', responseData.data['token']);
        alert('Login Successful');
        if (responseData.data['role'] === 'ADMIN') {
          window.location.href = '/admin-dashboard';
        } else {
          window.location.href = '/home';
        }
      } else {
        alert('Error: ' + responseData.data);
      }
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
      alert('An error occurred: ' + error.message);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mt-8 px-4 sm:px-8">
      {/* Image Section */}
      <img
        className="w-full sm:w-[400px] md:w-[490px] lg:w-[600px] h-auto object-cover"
        src={PhoneCart}
        alt="Shopping"
        style={{ flexShrink: 0 }}
      />

      {/* Form Section */}
      <div className="flex flex-col items-center text-center w-full max-w-[400px] mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Log in to RealMarket
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mb-6">
          Please enter your details below
        </p>

        <form className="w-full" onSubmit={handleSubmit}>
          <input
            className="w-full text-gray-800 placeholder-gray-500 p-2 border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none mb-4"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="w-full text-gray-800 placeholder-gray-500 p-2 border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none mb-6"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-md mt-4 hover:bg-blue-700 transition duration-200"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Log In'}
          </button>
        </form>

        <p className="text-gray-600 text-sm sm:text-base mt-4">
          Don’t have an account?{' '}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
