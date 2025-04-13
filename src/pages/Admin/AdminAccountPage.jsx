import React, { useState } from 'react';
import { Form, Input, Button, message, Tabs, Card, Avatar, Upload } from 'antd';
import { UserOutlined, LockOutlined, UploadOutlined } from '@ant-design/icons';
import { useAuth } from '../../hooks/useAuth';
import { updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const { TabPane } = Tabs;

const AdminAccountPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleProfileUpdate = async (values) => {
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, {
        displayName: values.displayName,
        photoURL: values.photoURL
      });
      message.success('Profile updated successfully');
    } catch (error) {
      message.error('Failed to update profile');
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (values) => {
    setLoading(true);
    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        values.currentPassword
      );
      
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, values.newPassword);
      
      message.success('Password updated successfully');
      form.resetFields(['currentPassword', 'newPassword', 'confirmPassword']);
    } catch (error) {
      message.error('Failed to update password');
      console.error('Error updating password:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
      
      <Card>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Profile" key="1">
            <div className="flex flex-col items-center mb-6">
              <Avatar
                size={100}
                src={user?.photoURL}
                icon={<UserOutlined />}
                className="mb-4"
              />
              <Upload
                showUploadList={false}
                beforeUpload={() => false}
                onChange={({ file }) => {
                  if (file) {
                    // Handle file upload here
                    console.log('File to upload:', file);
                  }
                }}
              >
                <Button icon={<UploadOutlined />}>Change Photo</Button>
              </Upload>
            </div>

            <Form
              layout="vertical"
              initialValues={{
                displayName: user?.displayName,
                email: user?.email
              }}
              onFinish={handleProfileUpdate}
            >
              <Form.Item
                name="displayName"
                label="Display Name"
                rules={[{ required: true, message: 'Please input your display name!' }]}
              >
                <Input prefix={<UserOutlined />} />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
              >
                <Input disabled />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Update Profile
                </Button>
              </Form.Item>
            </Form>
          </TabPane>

          <TabPane tab="Security" key="2">
            <Form
              form={form}
              layout="vertical"
              onFinish={handlePasswordChange}
            >
              <Form.Item
                name="currentPassword"
                label="Current Password"
                rules={[{ required: true, message: 'Please input your current password!' }]}
              >
                <Input.Password prefix={<LockOutlined />} />
              </Form.Item>

              <Form.Item
                name="newPassword"
                label="New Password"
                rules={[
                  { required: true, message: 'Please input your new password!' },
                  { min: 6, message: 'Password must be at least 6 characters!' }
                ]}
              >
                <Input.Password prefix={<LockOutlined />} />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label="Confirm New Password"
                dependencies={['newPassword']}
                rules={[
                  { required: true, message: 'Please confirm your new password!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password prefix={<LockOutlined />} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Change Password
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default AdminAccountPage; 