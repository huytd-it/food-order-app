import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Spin, Result, Button } from 'antd';

const ProtectedRoute = ({ children }) => {
  const { user, loading, error } = useAuth();

  if (error) {
    return (
      <Result
        status="error"
        title="Authentication Error"
        subTitle={error.message}
        extra={[
          <Button type="primary" key="refresh" onClick={() => window.location.reload()}>
            Refresh Page
          </Button>
        ]}
      />
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute; 