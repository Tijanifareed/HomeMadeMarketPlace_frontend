import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode'; // Correct import
import { useNavigate } from 'react-router-dom';

const SellerApplicants = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);
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

  const fetchApplications = async () => {
    const adminId = getUserIdFromToken();

    if (!adminId) {
      console.error("User ID not found in token");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/getAllPendingSellers`, {
        method: 'POST',
        body: JSON.stringify({ adminId }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 401) {
        alert('Session expired. Please log in again.');
        navigate('/login');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch applications.');
      }

      const data = await response.json();
      console.log("API Response:", data);

      // Ensure the response contains the expected sellerList array
      setApplications(data.data?.sellerList || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching applications:', err);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []); // No dependencies for one-time fetch

  if (error) {
    return <p className="text-red-500 font-medium">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-6 mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">Seller Applications</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.length > 0 ? (
          applications.map((application) => (
            <div
              key={application.id}
              className="bg-white border border-gray-200 shadow-lg rounded-lg p-4 hover:shadow-xl transition duration-300"
            >
              <img
                src={application.idCardUrl}
                alt="ID Card"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <p className="text-lg font-medium">NIN: {application.nin}</p>
              <p className="text-lg font-medium">BVN: {application.bvn}</p>
              <p className="text-gray-500 mb-4">Status: {application.status}</p>
              <a
                href={application.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md text-center hover:bg-blue-600"
              >
                View Portfolio
              </a>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No applications found.
          </p>
        )}
      </div>
    </div>
  );
};

export default SellerApplicants;
