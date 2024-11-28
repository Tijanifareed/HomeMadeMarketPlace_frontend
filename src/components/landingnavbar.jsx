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
      {/* Top Section */}
      <nav className="flex flex-col md:flex-row items-center justify-between p-3">
        {/* RealMart Logo */}
        <div className="text-xl font-bold text-right ml-5 md:ml-20">
          <span className="text-blue-500">Real</span>Mart
        </div>

        {/* Search Bar */}
        <form className="flex items-center w-full md:w-auto">
          <input
            className="w-full md:w-64 p-2 bg-gray-200 text-black placeholder-gray-500 rounded-3xl pl-9"
            type="text"
            placeholder="Search products..."
          />
          <div className="absolute left-4">
            <FaSearch className="text-gray-500" />
          </div>
          <button
            type="submit"
            className="hidden md:block bg-blue-500 text-white px-4 py-2 rounded-3xl ml-2"
          >
            Search
          </button>
        </form>
      </nav>

      {/* Bottom Section for Mobile */}
      <div className="flex md:hidden justify-between items-center fixed bottom-0 w-full bg-white p-3 shadow-md">
        {/* User */}
        <div className="flex items-center bg-blue-500 text-white px-3 py-2 rounded-3xl gap-2">
          <TbUserCheck className="text-white text-sm" />
          <select
            className="bg-blue-500 text-white outline-none text-xs" // Reduced width and text size
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
          <GoQuestion className="text-white text-sm" />
          <select
            className="bg-blue-500 text-white outline-none text-xs" // Reduced width and text size
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
          className="bg-blue-500 text-white px-4 py-2 rounded-3xl ml-2 flex"
        >
          <GiShoppingCart className="text-white mr-2" />
          Cart
        </button>
      </div>
    </header>
  );
};

export default Landingnavbar;
