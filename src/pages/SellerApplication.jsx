import React, { useState } from 'react';
import PhoneCart from '../assets/PhoneCart.svg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const SellerApplication = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [nin, setNin] = useState('');
  const [bvn, setBvn] = useState('');
  const [idCard, setIdCard] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();

  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded = jwtDecode(token);
      return decoded.userId;
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
      const response = await fetch(`${API_URL}/sellerApplication`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });

      if (response.status === 401) {
        alert('Session expired. Please log in again.');
        navigate('/login');
      } else if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.data.message);
        setIsSubmitted(true);
      } else {
        console.error('Error submitting application');
        const data = await response.json();
        setSuccessMessage(data.data);
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Error:', error);

    }
  };

  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center h-screen flex-col">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">
          🎉 {successMessage}
        </h1>
        <Link to="/home">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
            Back to Home
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center min-h-screen p-6 bg-gray-100">
      <img
        className="w-full sm:w-1/2 lg:w-1/3 object-cover mb-6 sm:mb-0"
        src={PhoneCart}
        alt="Illustration"
      />

      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Seller Application
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              NIN
            </label>
            <input
              type="text"
              value={nin}
              onChange={(e) => setNin(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
              placeholder="Enter your NIN"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              BVN
            </label>
            <input
              type="text"
              value={bvn}
              onChange={(e) => setBvn(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
              placeholder="Enter your BVN"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              ID Card
            </label>
            <input
              type="file"
              onChange={(e) => setIdCard(e.target.files[0])}
              className="w-full text-gray-500"
            />
            {idCard && (
              <p className="mt-2 text-sm text-gray-500">
                Selected File: {idCard.name}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Portfolio
            </label>
            <input
              type="file"
              onChange={(e) => setPortfolio(e.target.files[0])}
              className="w-full text-gray-500"
            />
            {portfolio && (
              <p className="mt-2 text-sm text-gray-500">
                Selected File: {portfolio.name}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellerApplication;
