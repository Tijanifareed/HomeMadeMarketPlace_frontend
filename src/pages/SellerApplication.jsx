import React, { useState } from 'react';
import PhoneCart from '../assets/PhoneCart.svg';
import { Link } from 'react-router-dom';

import {jwtDecode} from 'jwt-decode';


const SellerApplication = () => {
  const [nin, setNin] = useState('');
  const [bvn, setBvn] = useState('');
  const [idCard, setIdCard] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  const [successMessage, setSuccessMessage] = useState(''); // To hold the success message
  const [isSubmitted, setIsSubmitted] = useState(false); // New state variable



  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded = jwtDecode(token);
      return decoded.userId; // Ensure userId is present in your JWT payload
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = getUserIdFromToken();
    if (!userId) {
      console.error('User ID not found in token');
      return;
    }

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('nin', nin);
    formData.append('bvn', bvn);
    formData.append('idCardUrl', idCard);
    formData.append('portfolio', portfolio);

    try {
      const response = await fetch('http://localhost:8080/sellerApplication', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Application submitted successfully!');
        setSuccessMessage(data.data.message);
        setIsSubmitted(true); // Set submission status to true
        // alert(data.data.message);
      } else {
        console.error('Error submitting application');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center h-screen flex-col">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
          {successMessage}
          
         
        </h1>
        <Link to="/home">
        <button
              // type="submit"
              className="w-24 bg-blue-600 text-white py-3 rounded-md mt-4 hover:bg-blue-700 transition duration-200"
              
            >


              Home
            </button>
            </Link>

      </div>
    );
  }

  return (
    <div>
      {/* <Navbar /> */}
      <div className="mt-[35px] flex items-center gap-8">
        <img
          className="w-[100%] sm:w-[400px] sm:h-[330px] md:w-[490px] md:h-[401px] lg:w-[600px] lg:h-[500px] object-cover"
          src={PhoneCart}
          alt="Description"
          style={{ flexShrink: 0 }}
        />

        <div className="flex flex-col items-center text-center max-w-[400px] w-full mx-auto pr-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Just Few Information to get you started
          </h1>
          <p className="text-gray-600 text-sm md:text-base mb-6">
            Please enter your details below...
          </p>

          <form className="w-full" onSubmit={handleSubmit}>
            <input
              className="w-full text-gray-800 placeholder-gray-500 p-2 border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none mb-4"
              type="text"
              placeholder="NIN"
              value={nin}
              onChange={(e) => setNin(e.target.value)}
            />
            <input
              className="w-full text-gray-800 placeholder-gray-500 p-2 border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none mb-6"
              type="text"
              placeholder="BVN"
              value={bvn}
              onChange={(e) => setBvn(e.target.value)}
            />
                <p className='text-left  text-gray-800 '>Id card</p>
            <input
              className="w-full text-gray-800 placeholder-gray-500 p-2 border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none mb-6"
              type="file"
              placeholder='Idcard'
              onChange={(e) => setIdCard(e.target.files[0])} // Use files[0] for file input
            />


            <p className='text-left  text-gray-800 '>Portfolio</p>
            <input
              className="w-full text-gray-800 placeholder-gray-500 p-2 border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none mb-6"
              type="file"
              onChange={(e) => setPortfolio(e.target.files[0])} // Use files[0] for file input
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md mt-4 hover:bg-blue-700 transition duration-200"
            >
              Apply
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerApplication;
