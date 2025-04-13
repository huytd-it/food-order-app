import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebaseConfig';
import { getDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { Result, Button, Card, Typography, Space } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const TestFirebase = () => {
  const [connectionStatus, setConnectionStatus] = useState({
    auth: 'checking',
    firestore: 'checking',
    user: null
  });

  useEffect(() => {
    // Test Auth connection
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setConnectionStatus(prev => ({
          ...prev,
          auth: 'success',
          user
        }));

        // Test Firestore connection
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          setConnectionStatus(prev => ({
            ...prev,
            firestore: 'success'
          }));
        } catch (error) {
          console.error('Firestore test error:', error);
          setConnectionStatus(prev => ({
            ...prev,
            firestore: 'error'
          }));
        }
      } else {
        setConnectionStatus(prev => ({
          ...prev,
          auth: 'error',
          user: null
        }));
      }
    });

    return () => unsubscribe();
  }, []);

  const getStatusIcon = (status) => {
    if (status === 'checking') return <span className="animate-spin">🔄</span>;
    if (status === 'success') return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
    if (status === 'error') return <CloseCircleOutlined style={{ color: '#ff4d4f' }} />;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <Title level={2} className="text-center mb-6">Firebase Connection Test</Title>
        
        <Space direction="vertical" size="large" className="w-full">
          <div className="flex justify-between items-center">
            <Text>Authentication Status:</Text>
            {getStatusIcon(connectionStatus.auth)}
          </div>

          <div className="flex justify-between items-center">
            <Text>Firestore Status:</Text>
            {getStatusIcon(connectionStatus.firestore)}
          </div>

          {connectionStatus.user && (
            <div className="mt-4">
              <Text strong>Current User:</Text>
              <div className="mt-2">
                <Text>Email: {connectionStatus.user.email}</Text>
                <br />
                <Text>UID: {connectionStatus.user.uid}</Text>
              </div>
            </div>
          )}

          {(connectionStatus.auth === 'success' && connectionStatus.firestore === 'success') ? (
            <Result
              status="success"
              title="Firebase Connection Successful!"
              subTitle="All Firebase services are connected and working properly."
            />
          ) : (
            <Result
              status="error"
              title="Connection Issues Detected"
              subTitle="Please check your Firebase configuration and try again."
              extra={[
                <Button type="primary" key="refresh" onClick={() => window.location.reload()}>
                  Refresh Test
                </Button>
              ]}
            />
          )}
        </Space>
      </Card>
    </div>
  );
};

export default TestFirebase; 