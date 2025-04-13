import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  CubeIcon,
} from '@heroicons/react/24/outline';

const AdminSidebar = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
    { name: 'Food Management', href: '/admin/foods', icon: CubeIcon },
    { name: 'User Management', href: '/admin/users', icon: UserGroupIcon },
    { name: 'Order Management', href: '/admin/orders', icon: ShoppingBagIcon },
  ];

  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h2 className="text-xl font-bold text-primary">Admin Panel</h2>
      </div>
      <nav className="mt-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-4 py-3 text-sm font-medium ${
                isActive
                  ? 'bg-primary/10 text-primary border-l-4 border-primary'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default AdminSidebar; 