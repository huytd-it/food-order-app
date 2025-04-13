import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
          </div>
          <div className="flex items-center">
            <Space>
              <span className="text-gray-700">Welcome, {user?.displayName || 'Admin'}</span>
              <Button type="primary" danger onClick={handleSignOut}>
                Sign Out
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader; 