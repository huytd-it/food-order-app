import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { auth } from '../../firebaseConfig';
import logo from '../../assets/logo.svg';
import { 
  HomeIcon, 
  ShoppingCartIcon, 
  UserIcon, 
  CogIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import UserDropdown from './UserDropdown';

const Header = () => {
  const { user } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Food Order Logo" className="h-8" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="flex items-center text-gray-600 hover:text-primary">
              <HomeIcon className="h-5 w-5 mr-1" />
              Home
            </Link>
            <Link to="/menu" className="flex items-center text-gray-600 hover:text-primary">
              <ShoppingCartIcon className="h-5 w-5 mr-1" />
              Menu
            </Link>
            {user ? (
              <>
                <Link to="/cart" className="relative flex items-center text-gray-600 hover:text-primary">
                  <ShoppingCartIcon className="h-5 w-5 mr-1" />
                  Cart
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Link>
                {user.isAdmin && (
                  <Link to="/admin" className="flex items-center text-gray-600 hover:text-primary">
                    <CogIcon className="h-5 w-5 mr-1" />
                    Admin
                  </Link>
                )}
                <UserDropdown />
              </>
            ) : (
              <Link to="/login" className="flex items-center text-gray-600 hover:text-primary">
                <UserIcon className="h-5 w-5 mr-1" />
                Login
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="flex items-center text-gray-600 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                <HomeIcon className="h-5 w-5 mr-2" />
                Home
              </Link>
              <Link
                to="/menu"
                className="flex items-center text-gray-600 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCartIcon className="h-5 w-5 mr-2" />
                Menu
              </Link>
              {user ? (
                <>
                  <Link
                    to="/cart"
                    className="flex items-center text-gray-600 hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ShoppingCartIcon className="h-5 w-5 mr-2" />
                    Cart ({itemCount})
                  </Link>
                  {user.isAdmin && (
                    <Link
                      to="/admin"
                      className="flex items-center text-gray-600 hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <CogIcon className="h-5 w-5 mr-2" />
                      Admin
                    </Link>
                  )}
                  <UserDropdown />
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center text-gray-600 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <UserIcon className="h-5 w-5 mr-2" />
                  Login
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header; 