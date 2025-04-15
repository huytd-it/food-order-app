import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './routes/ProtectedRoute';
import HomePage from './pages/Public/HomePage';
import MenuPage from './pages/Public/MenuPage';
import CartPage from './pages/Public/CartPage';
import LoginPage from './pages/Public/LoginPage';
import RegisterPage from './pages/Public/RegisterPage';
import CheckoutPage from './pages/Public/CheckoutPage';
import NotFoundPage from './pages/Public/NotFoundPage';
import TestFirebase from './components/TestFirebase';
import TestRedux from './components/TestRedux';
import TestAuth from './components/TestAuth';
import TestLogin from './components/Test/TestLogin';
import OrdersHistory from './pages/User/OrdersHistory';
import Favorites from './pages/User/Favorites';
import 'antd/dist/reset.css';
import AdminRoutes from './routes/AdminRoutes';

const App = () => {
  const publicRoutes = [
    { path: '/', element: <HomePage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/register', element: <RegisterPage /> },
    { path: '/menu', element: <MenuPage /> },
    { path: '/test-auth', element: <TestAuth /> },
    { path: '/test-login', element: <TestLogin /> },
  ];

  const protectedRoutes = [
    { path: '/cart', element: <CartPage /> },
    { path: '/checkout', element: <CheckoutPage /> },
    { path: '/orders', element: <OrdersHistory /> },
    { path: '/favorites', element: <Favorites /> },
    { path: '/test-firebase', element: <TestFirebase /> },
    { path: '/test-redux', element: <TestRedux /> },
  ];

  return (
    <Provider store={store}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout />}>
          {publicRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          
          {/* Protected Routes */}
          {protectedRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <ProtectedRoute>
                  {route.element}
                </ProtectedRoute>
              }
            />
          ))}
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          {protectedRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))}
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* Not Found Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Provider>
  );
};

export default App; 