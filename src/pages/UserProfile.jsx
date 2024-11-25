import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { jwtDecode } from 'jwt-decode';
import { CiEdit } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [profileData, setProfileData] = useState({
    profilePicture: '',
    userName: '',
    phoneNumber: '',
    email: '',
    address: '',
    role: '',
    bio: '',
  });

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

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const userId = getUserIdFromToken();
    if (!userId) {
      console.error("User ID not found in token");
      return;
    }

    const formData = new FormData();
    formData.append('id', userId);
    formData.append('file', file);

    try {
      const response = await fetch(`${API_URL}/upload-picture`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 401) {
        alert('Session expired. Please log in again.');
        navigate('/login');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to upload profile picture');
      }

      alert('Profile picture updated successfully! Reload the page to view the updated picture.');
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  };

  useEffect(() => {
    const userId = getUserIdFromToken();

    const fetchProfileData = async () => {
      if (!userId) {
        console.error("User ID not found in token");
        return;
      }

      try {
        const response = await fetch(`${API_URL}/profile`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ userId }),
        });

        if (response.status === 401) {
          alert('Session expired. Please log in again.');
          navigate('/login');
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();
        setProfileData(data.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfileData();
  }, []);

  const handleEditProfilePicture = () => {
    document.getElementById('profilePictureInput').click();
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-24">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <img
                src={profileData.profilePicture || ''}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 shadow-lg"
              />
              <button
                onClick={handleEditProfilePicture}
                className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full shadow hover:scale-110"
              >
                <CiEdit className="text-xl" />
              </button>
              <input
                id="profilePictureInput"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleProfilePictureChange}
              />
            </div>
            <h1 className="text-xl font-semibold text-gray-800 mt-4">{profileData.userName || "User Name"}</h1>
            <p className="text-gray-500 text-sm">{profileData.email || "Email not provided"}</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700">Phone:</span>
              <span>{profileData.phoneNumber || "Not provided"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700">Address:</span>
              <span>{profileData.address || "Not provided"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700">Role:</span>
              <span className="capitalize">{profileData.role || "Unknown"}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Bio:</span>
              <p className="text-gray-600 text-sm">{profileData.bio || "No bio available"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
