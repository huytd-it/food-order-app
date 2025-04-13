import React from 'react';
import { Link } from 'react-router-dom';
import UserDropdown from './UserDropdown';

const AdminHeader = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/admin/dashboard" className="text-2xl font-bold text-primary">
            Admin Dashboard
          </Link>

          <div className="flex items-center space-x-4">
            <UserDropdown />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader; 