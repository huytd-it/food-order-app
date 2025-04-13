import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Card, Typography, Space, Button, Result } from 'antd';

const { Title, Text } = Typography;

const TestAuth = () => {
  const { user, loading, error } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-96 text-center">
          <Title level={4}>Loading Auth State...</Title>
          <Text>Please wait while we check your authentication status</Text>
        </Card>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-96">
        <Title level={4}>Authentication Test</Title>
        
        <Space direction="vertical" size="large" className="w-full mt-4">
          <div>
            <Text strong>Current State:</Text>
            <ul className="list-disc pl-6 mt-2">
              <li>Logged In: {user ? 'Yes' : 'No'}</li>
              <li>User Role: {user?.role || 'No Role'}</li>
              <li>User ID: {user?.uid || 'Not Available'}</li>
              <li>Email: {user?.email || 'Not Available'}</li>
            </ul>
          </div>

          <div>
            <Text strong>Expected Behavior:</Text>
            <ul className="list-disc pl-6 mt-2">
              <li>Should redirect to login if accessing protected routes</li>
              <li>Should show loading state during auth check</li>
              <li>Should handle errors appropriately</li>
            </ul>
          </div>

          <div className="flex justify-center">
            <Button 
              type="primary" 
              onClick={() => window.location.href = '/cart'}
            >
              Test Protected Route
            </Button>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default TestAuth; 