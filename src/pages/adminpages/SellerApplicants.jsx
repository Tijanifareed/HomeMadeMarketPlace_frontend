import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';



const SellerApplicants = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

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

    const userId = getUserIdFromToken();
    if (!userId) {
      console.error("User ID not found in token");
      return;
    }

    const formData = new FormData();
    formData.append('adminId', userId);

      const fetchApplications = async () => {
          try {
              // const token = localStorage.getItem("jwt"); // Assume JWT is stored in localStorage
              const response = await fetch('http://localhost:8080/getAllPendingSellers', {
                method: 'POST',
                body: formData,
                headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
              });
              // if (response.status === 401) {
              //   alert('Session expired. Please log in again.');
              //   navigate('/login');
              //   return;
              // }


              if (!response.ok) throw new Error("Failed to fetch applications.");
              const data = await response.json();
              setApplications(data);
          } catch (err) {
              setError(err.message);
              console.error("Error fetching applications:", err);
          }
      };

      fetchApplications();
  }, []);

  if (error) return <p className="text-red-500 font-medium">Error: {error}</p>;

  return (
      <div className="container mx-auto p-6 mt-10">
          <h1 className="text-2xl font-bold text-center mb-6">Applications</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {applications.map((application) => (
                  <div
                      className="bg-white border border-gray-200 shadow-lg rounded-lg p-4 hover:shadow-xl transition duration-300"
                      key={application.id}
                  >
                      <img
                          src={application.idCardUrl}
                          alt="ID Card"
                          className="w-full h-48 object-cover rounded-md mb-4"
                      />
                      <p className="text-lg font-medium">NIN: {application.nin}</p>
                      <p className="text-gray-500 mb-4">Status: {application.status}</p>
                      <a
                          href={`/application/${application.id}`}
                          className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md text-center hover:bg-blue-600"
                      >
                          View Details
                      </a>
                  </div>
              ))}
          </div>
      </div>
  );
}

export default SellerApplicants
