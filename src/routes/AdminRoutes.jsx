import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import AdminDashboardPage from '../pages/Admin/AdminDashboardPage';
import AdminUserManagementPage from '../pages/Admin/AdminUserManagementPage';
import AdminMenuPage from '../pages/Admin/AdminMenuPage';
import AdminAccountPage from '../pages/Admin/AdminAccountPage';
import AdminRoute from './AdminRoute';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="users" element={<AdminUserManagementPage />} />
        <Route path="menu" element={<AdminMenuPage />} />
        <Route path="account" element={<AdminAccountPage />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes; 