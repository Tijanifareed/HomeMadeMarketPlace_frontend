import React, { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import { TbUserCheck } from "react-icons/tb";
import { GoQuestion } from "react-icons/go";
import { GiShoppingCart } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const [username, setUsername] = useState('');
  const [help, setHelp] = useState('');
  const [user, setUser] = useState('');

  const navigate = useNavigate();

  const handleUserChange = (e) => {
    const selectedOption = e.target.value;
    setUser(selectedOption);
    if (selectedOption === 'myaccount') navigate('/profile');
    else if (selectedOption === 'orders') navigate('/orders');
    else if (selectedOption === 'inbox') navigate('/inbox');
    else if (selectedOption === 'savedItem') navigate('/saved-items');
  };

  const handleHelpChange = (e) => {
    const selectedOption = e.target.value;
    setHelp(selectedOption);
    if (selectedOption === 'Helpcenter') navigate('/help');
    else if (selectedOption === 'PlaceOrder') navigate('/place-order');
    else if (selectedOption === 'sellerApplication') navigate('/Apply-Today');
    else if (selectedOption === 'TrackOrder') navigate('/track-order');
    else if (selectedOption === 'cancelOrder') navigate('/cancelOrder');
    else if (selectedOption === 'refund') navigate('/refund');
  };

  const getUserNameFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded = jwtDecode(token);
      return decoded.sub;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  };

  useEffect(() => {
    const userName = getUserNameFromToken();
    if (userName) setUsername(userName);
  }, []);

  return (
    <header className="fixed shadow-md top-12 w-full bg-transparent z-50">
      <nav className="flex flex-wrap items-center justify-between p-3 md:flex-nowrap">
        {/* Logo */}
        <div className="text-xl font-bold text-center md:text-left">RealMart</div>

        {/* Search Bar */}
        <div className="flex items-center mt-3 md:mt-0 w-full md:w-auto">
          <form className="relative flex w-full md:w-64">
            <input
              className="w-full p-2 bg-transparent text-black placeholder-gray-500 rounded-3xl pl-9"
              type="text"
              placeholder="Search products..."
            />
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
              <FaSearch className="text-gray-500" />
            </div>
          </form>
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-wrap items-center gap-2 mt-3 md:mt-0 md:gap-4">
          {/* User Dropdown */}
          <div className="flex items-center gap-2">
            <TbUserCheck className="hidden md:block" />
            <select
              className="bg-transparent  text-gray-900  outline-none text-sm"
              id="user"
              name="user"
              value={user}
              onChange={handleUserChange}
            >
              <option value="" disabled>
                Hi, {username || 'Guest'}
              </option>
              <option className='hover:text-sky-600 ' value="myaccount">My Account</option>
              <option value="orders">Orders</option>
              <option value="inbox">Inbox</option>
              <option value="savedItem">Saved Items</option>
            </select>
          </div>

          {/* Help Dropdown */}
          <div className="flex items-center gap-2">
            <GoQuestion className="hidden md:block" />
            <select
              className="bg-transparent text-gray-900 outline-none text-sm"
              id="help"
              name="help"
              value={help}
              onChange={handleHelpChange}
            >
              <option value="" disabled>
                Help
              </option>
              <option value="Helpcenter">Help center</option>
              <option value="PlaceOrder">Place an Order</option>
              <option value="sellerApplication">Apply to be a seller</option>
              <option value="TrackOrder">Track an order</option>
              <option value="cancelOrder">Cancel an order</option>
              <option value="refund">Refunds</option>
            </select>
          </div>

          {/* Cart Button */}
          <button className="text-black flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
            <GiShoppingCart className="text-black" />
            <span className="hidden md:inline">Cart</span>
          </button>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
