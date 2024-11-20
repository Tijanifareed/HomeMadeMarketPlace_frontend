// src/components/Navbar.jsx
import React from 'react';

const Navbar = () => {
  return (
    <div className="w-full h-16 bg-blue-600 flex items-center justify-between px-4 fixed z-10">
      <h1 className="text-white font-semibold text-lg">Welcome, Admin</h1>
      <button className="text-white bg-red-500 px-4 py-2 rounded">Logout</button>
    </div>
  );
};

export default Navbar;
