import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import Logo from '../Logo';
import {
  HomeIcon,
  ShoppingBagIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon
} from '@heroicons/react/24/outline';

const Header = () => {
  const { user, logout } = useAuth();
  const { cartItems, itemCount } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [badgeAnimation, setBadgeAnimation] = useState(false);

  // Trigger animation when itemCount changes
  useEffect(() => {
    setBadgeAnimation(true);
    const timer = setTimeout(() => setBadgeAnimation(false), 1000);
    return () => clearTimeout(timer);
  }, [itemCount]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    {
      name: 'Cart',
      href: '/cart',
      icon: ShoppingCartIcon,
      badge: itemCount > 0 ? itemCount : null,
    },
    {
      name: user ? 'Profile' : 'Login',
      href: user ? '/profile' : '/login',
      icon: UserIcon,
    },
  ];

  return (
    <header className="bg-white shadow-sm">
      <style jsx>{`
        @keyframes badgeBounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        .badge-animate {
          animation: badgeBounce 0.5s ease-in-out;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo size="sm" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center text-base font-medium text-gray-700 hover:text-primary relative"
              >
                {item.icon ? (
                  <div className="relative">
                    <item.icon className="h-6 w-6" />
                    {item.badge && (
                      <span 
                        className={`absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transition-all duration-300 ${
                          badgeAnimation ? 'badge-animate' : ''
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                ) : (
                  item.name
                )}
              </Link>
            ))}
            {user && (
              <button
                onClick={handleLogout}
                className="text-base font-medium text-gray-700 hover:text-primary"
              >
                Logout
              </button>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center text-base font-medium text-gray-700 hover:text-primary relative py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon ? (
                  <div className="flex items-center">
                    <item.icon className="h-6 w-6 mr-2" />
                    {item.name}
                    {item.badge && (
                      <span 
                        className={`ml-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transition-all duration-300 ${
                          badgeAnimation ? 'badge-animate' : ''
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                ) : (
                  item.name
                )}
              </Link>
            ))}
            {user && (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left text-base font-medium text-gray-700 hover:text-primary py-2"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 