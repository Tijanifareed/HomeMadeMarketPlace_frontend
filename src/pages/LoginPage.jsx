import React, { useState } from 'react';
import PhoneCart from '../assets/PhoneCart.svg';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/loginPage", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        // Use localStorage to allow access across tabs
        localStorage.setItem('token', responseData.data['token']); 
        localStorage.setItem('username', responseData.data['userName']);
        
        alert('Login Successful');
        window.location.href = '/'; // Redirect to the booking page
      } else {
        alert('Error: ' + responseData.data); // Show error message if login fails
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred: ' + error.message); // Alert if there is an error
    }
  };

  return (
    <div className="mt-[35px] flex items-center gap-8">
      <img 
        className="w-[100%] sm:w-[400px] sm:h-[330px] md:w-[490px] md:h-[401px] lg:w-[600px] lg:h-[500px] object-cover" 
        src={PhoneCart} // Replace with actual image path
        alt="Description" 
        style={{ flexShrink: 0 }} 
      />

      <div className="flex flex-col items-center text-center max-w-[400px] w-full mx-auto pr-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Log in to RealMarket
        </h1>
        <p className="text-gray-600 text-sm md:text-base mb-6">
          Please enter your details below
        </p>

        <form className="w-full" onSubmit={handleSubmit}>
          <input
            className="w-full text-gray-800 placeholder-gray-500 p-2 border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none mb-4"
            type="text"
            placeholder="username"
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
            className="w-full bg-blue-600 text-white py-3 rounded-md mt-4 hover:bg-blue-700 transition duration-200"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
