import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import {jwtDecode} from 'jwt-decode';

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

  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded = jwtDecode(token);
      return decoded.userId; // Update based on your JWT payload
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
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
          body: JSON.stringify({ userId }), // Ensure key here matches backend expectation
          // credentials: 'include',

            });

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

  return (
    <div>
      <Navbar />
      <div className='mt-[140px] justify-items-center'>
        <div className='border-solid w-[380px] h-[430px] bg-gradient-to-t from-blue-500 to-transparent rounded-2xl'>
          <p className='ml-40 mr-36 text-2xl underline'>Profile</p>
          <div>
            <img src={profileData.profilePicture} alt="Profile picture" className="rounded-full h-40 w-40 object-cover ml-[110px]" />
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
