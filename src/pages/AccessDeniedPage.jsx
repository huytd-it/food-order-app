import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LockOutlined, HomeOutlined } from '@ant-design/icons';

const AccessDeniedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Result
        status="403"
        title="Access Denied"
        subTitle="Sorry, you don't have permission to access this page."
        extra={[
          <Button
            key="home"
            type="primary"
            icon={<HomeOutlined />}
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>,
          <Button
            key="login"
            icon={<LockOutlined />}
            onClick={() => navigate('/login')}
          >
            Login with Admin Account
          </Button>
        ]}
      />
    </div>
  );
};

export default AccessDeniedPage; 