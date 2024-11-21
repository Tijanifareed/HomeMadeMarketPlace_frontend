// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-1/5 h-screen bg-gray-800 text-white fixed">
      <div className="p-4 text-lg font-bold border-b border-gray-600">Admin Dashboard</div>
      <nav className="mt-4">
        <ul className="space-y-4">
          <li>
            <a href="/admin/users" className="block px-4 py-2 hover:bg-gray-700 rounded">
              User Management
            </a>
          </li>
          <li>
            <a href="/admin/applications" className="block px-4 py-2 hover:bg-gray-700 rounded">
              Seller Applications
            </a>
          </li>
          <li>
            <Link to="/admin/analytics" className="block px-4 py-2 hover:bg-gray-700 rounded">
              Analytics
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
