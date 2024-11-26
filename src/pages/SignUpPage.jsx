import PhoneCart from '../assets/PhoneCart.svg';
import React, { useState } from 'react';

const SignUpPage = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(''); // New phone number field

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          phoneNumber, // Include phone number in request
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        alert('Sign-Up Successful');
        window.location.href = '/login'; // Redirect to the login page
      } else {
        console.error(responseData);
        alert('Error: ' + responseData.data);
      }
    } catch (error) {
      console.error('Error:', error.data);
      alert('An error occurred: ' + error.data);
    }
  };

  return (
    <div className="mt-12 flex flex-col-reverse lg:flex-row items-center gap-8 px-4">
      <div className="flex flex-col items-center text-center w-full max-w-md mx-auto">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
          Sign Up for RealMarket
        </h1>
        <p className="text-gray-600 text-sm md:text-base mb-6">
          Create your account below
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
            className="w-full text-gray-800 placeholder-gray-500 p-2 border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none mb-4"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full text-gray-800 placeholder-gray-500 p-2 border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none mb-4"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="w-full text-gray-800 placeholder-gray-500 p-2 border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none mb-4"
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md mt-4 hover:bg-blue-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <p className="text-gray-600 text-sm md:text-base mt-4">
          Already created an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>

      <img
        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-cover"
        src={PhoneCart}
        alt="Phone Cart"
      />
    </div>
  );
};

export default SignUpPage;
