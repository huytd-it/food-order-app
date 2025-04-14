import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, setUser } from '../../store/slices/authSlice';
import { 
  ShoppingCartIcon, 
  UserIcon, 
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  ShoppingBagIcon,
  ClockIcon,
  UserCircleIcon,
  BellIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  HeartIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';
import { auth } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Nếu user đã đăng nhập, cập nhật thông tin vào Redux store
        dispatch(setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          name: currentUser.displayName || 'Người dùng',
          photoURL: currentUser.photoURL,
          pendingOrders: 0,
          notifications: 0
        }));
      } else {
        // Nếu user chưa đăng nhập hoặc đã đăng xuất
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
    }
  };

  const navigation = [
    { name: 'Trang chủ', href: '/', icon: HomeIcon },
    { name: 'Thực đơn', href: '/menu', icon: ShoppingBagIcon },
    { name: 'Giỏ hàng', href: '/cart', icon: ShoppingCartIcon, badge: items.length }
  ];

  const userMenuItems = [
    { 
      name: 'Đơn hàng của tôi', 
      href: '/orders', 
      icon: ClockIcon, 
      badge: user?.pendingOrders || 0,
      description: 'Xem và theo dõi đơn hàng'
    },
    { 
      name: 'Món yêu thích', 
      href: '/favorites', 
      icon: HeartIcon,
      description: 'Danh sách món ăn yêu thích'
    },
    { 
      name: 'Thông tin cá nhân', 
      href: '/profile', 
      icon: UserCircleIcon,
      description: 'Cập nhật thông tin cá nhân'
    },
    { 
      name: 'Cài đặt', 
      href: '/settings', 
      icon: Cog6ToothIcon,
      description: 'Cài đặt tài khoản'
    },
    { 
      name: 'Trợ giúp', 
      href: '/help', 
      icon: QuestionMarkCircleIcon,
      description: 'Hỗ trợ và hướng dẫn'
    },
    { 
      name: 'Đăng xuất', 
      onClick: handleLogout, 
      icon: ArrowRightOnRectangleIcon,
      description: 'Đăng xuất khỏi tài khoản'
    }
  ];

  const renderUserMenu = () => {
    if (!user) {
      return (
        <Link
          to="/login"
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          onClick={() => setIsUserMenuOpen(false)}
        >
          <UserIcon className="h-5 w-5 mr-2" />
          Đăng nhập
        </Link>
      );
    }

    return (
      <>
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="text-sm font-medium text-gray-900">{user.name}</div>
          <div className="text-xs text-gray-500">{user.email}</div>
        </div>
        <div className="py-1">
          {userMenuItems.map((item) => (
            <React.Fragment key={item.name}>
              {item.href ? (
                <Link
                  to={item.href}
                  className="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <item.icon className="h-5 w-5 mr-2" />
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.description}</div>
                    </div>
                  </div>
                  {item.badge > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ) : (
                <button
                  onClick={() => {
                    item.onClick();
                    setIsUserMenuOpen(false);
                  }}
                  className="flex items-start w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <item.icon className="h-5 w-5 mr-2" />
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.description}</div>
                    </div>
                  </div>
                </button>
              )}
            </React.Fragment>
          ))}
        </div>
      </>
    );
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">
              <span className="text-primary">Food</span>
              <span className="text-secondary">Order</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center transition-colors ${
                  location.pathname === item.href
                    ? 'text-primary font-medium'
                    : 'text-gray-700 hover:text-primary'
                }`}
              >
                <item.icon className="h-6 w-6" />
                <span className="ml-2">{item.name}</span>
                {item.badge > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
            
            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={`flex items-center transition-colors ${
                  isUserMenuOpen ? 'text-primary' : 'text-gray-700 hover:text-primary'
                }`}
              >
                <div className="relative">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.name}
                      className="h-6 w-6 rounded-full"
                    />
                  ) : (
                    <UserIcon className="h-6 w-6" />
                  )}
                  {user?.notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {user.notifications}
                    </span>
                  )}
                </div>
                <span className="ml-2">{user ? user.name : 'Đăng nhập'}</span>
                {isUserMenuOpen ? (
                  <ChevronUpIcon className="h-4 w-4 ml-1" />
                ) : (
                  <ChevronDownIcon className="h-4 w-4 ml-1" />
                )}
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100">
                  {renderUserMenu()}
                </div>
              )}
            </div>
          </div>

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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-lg shadow-lg mt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2 rounded-md ${
                    location.pathname === item.href
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-6 w-6" />
                  <span className="ml-3">{item.name}</span>
                  {item.badge > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
              
              {user ? (
                <>
                  <div className="px-3 py-2 text-sm text-gray-500 border-t border-gray-100">
                    <div className="font-medium text-gray-900">{user.name}</div>
                    <div className="text-xs">{user.email}</div>
                  </div>
                  {userMenuItems.map((item) => (
                    <React.Fragment key={item.name}>
                      {item.href ? (
                        <Link
                          to={item.href}
                          className="flex items-start px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <div className="flex items-center">
                            <item.icon className="h-6 w-6" />
                            <div className="ml-3">
                              <div className="font-medium">{item.name}</div>
                              <div className="text-xs text-gray-500">{item.description}</div>
                            </div>
                          </div>
                          {item.badge > 0 && (
                            <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      ) : (
                        <button
                          onClick={() => {
                            item.onClick();
                            setIsMenuOpen(false);
                          }}
                          className="flex items-start w-full px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                        >
                          <div className="flex items-center">
                            <item.icon className="h-6 w-6" />
                            <div className="ml-3">
                              <div className="font-medium">{item.name}</div>
                              <div className="text-xs text-gray-500">{item.description}</div>
                            </div>
                          </div>
                        </button>
                      )}
                    </React.Fragment>
                  ))}
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <UserIcon className="h-6 w-6" />
                  <span className="ml-3">Đăng nhập</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header; 