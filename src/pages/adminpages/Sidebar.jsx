import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path); // Navigate to the specified path
  };

  return (
    <div className="w-1/5 h-screen bg-gray-800 text-white fixed">
      <div className="p-4 text-lg font-bold border-b border-gray-600">Admin Dashboard</div>
      <nav className="mt-4">
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => handleNavigation('/admin/users')}
              className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded"
            >
              User Management
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation('/admin/applications')}
              className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded"
            >
              Seller Applications
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation('/admin/analytics')}
              className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded"
            >
              Analytics
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
