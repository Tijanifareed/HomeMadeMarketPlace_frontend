import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { jwtDecode } from 'jwt-decode';
import { CiEdit } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


const UserProfile = () => {
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
      const response = await fetch('http://localhost:8080/upload-picture', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      }).then(response => {
        if (response.status === 401) {
          alert('Session expired. Please log in again.');
          navigate('/login');
        }
      });

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
        const response = await fetch("http://localhost:8080/profile", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ userId }),
        })
          if (response.status === 401) {
            alert('Session expired. Please log in again.');
            navigate('/login');
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
      <div className='mt-[140px] justify-items-center'>
        <div className='border-solid w-[380px] h-[430px] bg-gradient-to-t from-blue-500 to-transparent rounded-2xl'>
          <p className='ml-40 mr-36 text-2xl underline'>Profile</p>
          <div>
            <div className='flex items-center '>
              <img
                src={profileData.profilePicture || <FaUser />}
                alt="Profile"
                className="rounded-full h-40 w-40 object-cover ml-[110px] hover:scale-110"
              />
              <button
                onClick={handleEditProfilePicture}
                className='cursor-pointer hover:opacity-75'
              >
                <CiEdit className='mt-[150px] text-2xl mr-[60px]' />
              </button>
              <input
                id="profilePictureInput"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleProfilePictureChange}
              />
            </div>
            <div className='mt-[20px] ml-[30px]'>
              <p className='text-white text-[20px]'><strong>Username: </strong> {profileData.userName}</p>
              <p className='text-white text-[20px]'><strong>Phone number:</strong> {profileData.phoneNumber}</p>
              <p className='text-white text-[20px]'><strong>E-mail: </strong> {profileData.email}</p>
              <p className='text-white text-[20px]'><strong>Address: </strong> {profileData.address}</p>
              <p className='text-white text-[20px]'><strong>Role: </strong> {profileData.role}</p>
              <p className='text-white text-[20px]'><strong>Bio: </strong> {profileData.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
