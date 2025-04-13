import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';

const AdminSidebar = () => {
  const location = useLocation();

  const navigation = [
    { 
      name: 'Dashboard', 
      href: '/admin', 
      icon: HomeIcon,
      description: 'View overview and statistics'
    },
    { 
      name: 'Users', 
      href: '/admin/users', 
      icon: UserGroupIcon,
      description: 'Manage user accounts and roles'
    },
    { 
      name: 'Menu', 
      href: '/admin/menu', 
      icon: ShoppingBagIcon,
      description: 'Manage food items and categories'
    },
    { 
      name: 'Account', 
      href: '/admin/account', 
      icon: UserCircleIcon,
      description: 'Manage your account settings'
    },
    { 
      name: 'Settings', 
      href: '/admin/settings', 
      icon: Cog6ToothIcon,
      description: 'Configure system settings'
    },
  ];

  return (
    <div className="flex h-full flex-col bg-gray-800">
      <div className="flex h-16 shrink-0 items-center px-4 bg-gray-900">
        <Link to="/admin" className="text-white font-bold text-xl">
          Admin Panel
        </Link>
      </div>
      <nav className="flex flex-1 flex-col gap-y-5 overflow-y-auto px-4 py-4">
        <ul role="list" className="flex flex-1 flex-col gap-y-4">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`group flex flex-col gap-y-1 rounded-md p-3 ${
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-x-3">
                    <item.icon
                      className="h-6 w-6 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-semibold">{item.name}</span>
                  </div>
                  <span className="text-xs text-gray-400 group-hover:text-gray-300">
                    {item.description}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-auto">
          <Link
            to="/"
            className="group flex items-center gap-x-3 rounded-md p-3 text-sm font-semibold text-gray-400 hover:text-white hover:bg-gray-700"
          >
            <ArrowLeftOnRectangleIcon
              className="h-6 w-6 shrink-0"
              aria-hidden="true"
            />
            <span>Back to Home</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default AdminSidebar; 