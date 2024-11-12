import React, { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import { TbUserCheck } from "react-icons/tb";
import { GoQuestion } from "react-icons/go";
import { GiShoppingCart } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom
import { SiElsevier } from 'react-icons/si';
import {jwtDecode} from 'jwt-decode';




const Navbar = () => {
  const [username, setUsername] = useState('');
  const [Help, setHelp] = useState('');
  const [User, setUser] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  const handleUserChange = (e) => {
    const selectedOption = e.target.value;
    setUser(selectedOption);
    

    // Navigate to different pages based on selected option
    if (selectedOption === 'myaccount') {
      navigate('/profile'); // Change '/my-account' to your actual route
    } else if (selectedOption === 'orders') {
      navigate('/orders');
    } else if (selectedOption === 'inbox') {
      navigate('/inbox');
    } else if (selectedOption === 'savedItem') {
      navigate('/saved-items');
    }


    
  };


  const handleHelpChange = (e) => {
    const selectedOption = e.target.value;
    setHelp(selectedOption);

    if(selectedOption === 'Helpcenter'){
      navigate('/help');
    }else if(selectedOption === 'PlaceOrder'){
      navigate('/place-order');
    }else if(selectedOption === 'sellerApplication'){
      navigate('/Apply-Today');
    }else if(selectedOption === 'TrackOrder'){
        navigate('/track-order');
    }else if(selectedOption === 'cancelOrder') {
      navigate('/cancelOrder');
    }else if(selectedOption === 'refund'){
      navigate('/refund');
    }
  

    
  };

  const getUserNameFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded = jwtDecode(token);
      return decoded.sub; // Update based on your JWT payload
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  };
  

  useEffect(() => {
    const userName = getUserNameFromToken()


    // Check for username in localStorage
    if (userName) {
      setUsername(userName);
    }
  }, []);

  return (
    <header className="fixed shadow-md top-10 w-full h-14 bg-white z-50">
      <nav className="flex items-baseline p-3">
        <div className="text-xl font-bold text-right ml-20">RealMart</div>

        <div className="flex items-center ml-10 gap-3 relative">
          <form className="flex items-center">
            <input
              className="w-64 p-2 bg-gray-200 text-black placeholder-gray-500 rounded-3xl pl-9"
              type="text"
              placeholder="Search products..."
            />
            <div className="absolute left-2">
              <FaSearch className="text-gray-500" />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-3xl ml-2"
            >
              Search
            </button>
          </form>
        </div>

        <ul className="flex space-x-4 ml-40">
          <div className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-3xl gap-2">
            <TbUserCheck className="text-white" />
            <select
              className="bg-blue-500 text-white outline-none"
              id="User"
              name="User"
              value={User}
              onChange={handleUserChange}
            >
              <option value="" disabled>
                Hi, {username || 'Guest'}
              </option>
              <option value="myaccount">My Account</option>
              <option value="orders">Orders</option>
              <option value="inbox">Inbox</option>
              <option value="savedItem">Saved Items</option>
            </select>
          </div>

          <div className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-3xl gap-2">
            <GoQuestion className="text-white" />
            <select
          className="bg-blue-500 text-white outline-none"
          id="Help"
          name="Help"
          value={Help}
          onChange={handleHelpChange}
        >
          <option value="" disabled>Help</option>

          <option value="Helpcenter">Help center</option>
          <option value="PlaceOrder">Place an Order</option>
          <option value="sellerApplication">Apply to be a seller</option>
          <option value="TrackOrder">Track an order</option>
          <option value="cancelOrder">Cancel an order</option>
          <option value="refund">Refunds and Refund</option>

        </select>

          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-3xl ml-2 flex"
          >
            <GiShoppingCart className="text-gray-500 mr-2" />
            Cart
          </button>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
