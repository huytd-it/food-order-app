import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../components/Admin/AdminHeader';
import AdminSidebar from '../components/Admin/AdminSidebar';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <div className="flex h-[calc(100vh-4rem)]">
        <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-gray-800">
          <AdminSidebar />
        </aside>
        <main className="flex-1 ml-64 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 