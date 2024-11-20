// src/pages/AdminDashboard.jsx
import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="flex mt-10 ">
      <Sidebar />
      <div className="w-4/5 ml-1/5 min-h-screen bg-gray-100">
        <Navbar />
        <div className="pt-20 px-8">
          <Outlet /> {/* Dynamic Content from Routes */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
