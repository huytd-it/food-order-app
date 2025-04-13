import React, { useState } from 'react';
import { Form, Input, Button, message, Card, Space } from 'antd';
import { useAuth } from '../../hooks/useAuth';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const TestLogin = () => {
  const { user, loading } = useAuth();
  const [form] = Form.useForm();

  const handleLogin = async (values) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      message.success('Login successful!');
    } catch (error) {
      message.error('Login failed: ' + error.message);
      console.error('Login error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      message.success('Logged out successfully!');
    } catch (error) {
      message.error('Logout failed: ' + error.message);
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <Card title="Login Test" className="mb-6">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleLogin}
          disabled={loading}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title="Authentication State">
        <Space direction="vertical" className="w-full">
          <div className="text-sm">
            <strong>Loading State:</strong> {loading ? 'Loading...' : 'Loaded'}
          </div>
          <div className="text-sm">
            <strong>User Status:</strong> {user ? 'Logged In' : 'Not Logged In'}
          </div>
          {user && (
            <div className="space-y-2">
              <div className="text-sm">
                <strong>Email:</strong> {user.email}
              </div>
              <div className="text-sm">
                <strong>UID:</strong> {user.uid}
              </div>
              <div className="text-sm">
                <strong>Display Name:</strong> {user.displayName || 'Not set'}
              </div>
              <Button danger onClick={handleLogout} block>
                Logout
              </Button>
            </div>
          )}
        </Space>
      </Card>
    </div>
  );
};

export default TestLogin; 