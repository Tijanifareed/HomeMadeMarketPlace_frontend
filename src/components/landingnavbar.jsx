import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { TbUserCheck } from "react-icons/tb";
import { GoQuestion } from "react-icons/go";
import { GiShoppingCart } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';

const Landingnavbar = () => {
  const [Help, setHelp] = useState('');
  const [User, setUser] = useState('');
  const navigate = useNavigate();

  const handleUserChange = (e) => {
    const selectedOption = e.target.value;
    setUser(selectedOption);
    if (selectedOption === 'signup') {
      navigate('/login');
    } else if (selectedOption === 'createAccount') {
      navigate('/signup');
    }
  };

  const handleHelpChange = (e) => {
    const selectedOption = e.target.value;
    setHelp(selectedOption);
    if (selectedOption === 'Helpcenter') {
      navigate('/help');
    } else if (selectedOption === 'PlaceOrder') {
      navigate('/place-order');
    } else if (selectedOption === 'sellerApplication') {
      navigate('/Apply-Today');
    } else if (selectedOption === 'TrackOrder') {
      navigate('/track-order');
    } else if (selectedOption === 'cancelOrder') {
      navigate('/cancelOrder');
    } else if (selectedOption === 'refund') {
      navigate('/refund');
    }
  };

  return (
    <header className="fixed shadow-md w-full bg-white z-50">
      {/* Top Section for Desktop */}
      <nav className="hidden md:flex items-center justify-between p-3">
        {/* RealMart Logo */}
        <div className="text-xl font-bold text-left ml-5 md:ml-20">
          <span className="text-blue-500">Real</span>Mart
        </div>

        {/* Icons for Desktop */}
        <div className="flex gap-4 items-center">
          {/* User */}
          <div className="flex items-center bg-blue-500 text-white px-3 py-2 rounded-3xl gap-2">
            <TbUserCheck className="text-white text-xs" />
            <select
              className="bg-blue-500 text-white outline-none text-xs"
              id="User"
              name="User"
              value={User}
              onChange={handleUserChange}
            >
              <option value="" disabled>User</option>
              <option value="signup">Sign in</option>
              <option value="createAccount">Sign up</option>
            </select>
          </div>

          {/* Help */}
          <div className="flex items-center bg-blue-500 text-white px-3 py-2 rounded-3xl gap-2">
            <GoQuestion className="text-white text-xs" />
            <select
              className="bg-blue-500 text-white outline-none text-xs"
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

          {/* Cart */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-2 rounded-3xl flex items-center"
          >
            <GiShoppingCart className="text-white text-xs mr-2" />
            Cart
          </button>
        </div>
      </nav>

      {/* Top Section for Mobile */}
      <div className="md:hidden flex justify-between items-center p-3 fixed top-0 w-full bg-white shadow-md z-50">
        {/* RealMart Logo */}
        <div className="text-xl font-bold text-left ml-5">
          <span className="text-blue-500">Real</span>Mart
        </div>
        
        {/* Search Icon for Mobile */}
        <div className="flex items-center bg-blue-500 text-white px-3 py-2 rounded-3xl gap-2">
          <FaSearch className="text-white text-xs" />
        </div>
      </div>

      {/* Search Bar Section */}
      <div className="flex justify-center p-3 bg-white shadow-md md:static md:w-auto md:px-0 fixed bottom-0 w-full md:w-full z-50">
        <form className="flex items-center w-full md:w-64">
          <input
            className="w-full p-2 bg-gray-200 text-black placeholder-gray-500 rounded-3xl pl-9"
            type="text"
            placeholder="Search products..."
          />
          <div className="absolute left-4">
            <FaSearch className="text-gray-500 text-xs" />
          </div>
          <button
            type="submit"
            className="hidden md:block bg-blue-500 text-white px-4 py-2 rounded-3xl ml-2"
          >
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default Landingnavbar;
