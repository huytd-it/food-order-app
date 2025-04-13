import React from 'react';
import { Card, Row, Col, Statistic, Button, Space } from 'antd';
import { 
  UserOutlined, 
  ShoppingCartOutlined, 
  DollarOutlined,
  ArrowRightOutlined 
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const AdminDashboardPage = () => {
  const navigate = useNavigate();

  // Mock data - replace with real data from your backend
  const stats = {
    totalUsers: 150,
    totalOrders: 45,
    totalRevenue: 1250,
    activeUsers: 120
  };

  const quickActions = [
    {
      title: 'Manage Users',
      icon: <UserOutlined />,
      path: '/admin/users'
    },
    {
      title: 'View Orders',
      icon: <ShoppingCartOutlined />,
      path: '/admin/orders'
    },
    {
      title: 'Account Settings',
      icon: <UserOutlined />,
      path: '/admin/account'
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Users"
              value={stats.totalUsers}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Orders"
              value={stats.totalOrders}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={stats.totalRevenue}
              prefix={<DollarOutlined />}
              suffix="$"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Active Users"
              value={stats.activeUsers}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Card title="Quick Actions" className="mb-6">
        <Row gutter={[16, 16]}>
          {quickActions.map((action, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <Button 
                type="primary" 
                block
                icon={action.icon}
                onClick={() => navigate(action.path)}
                className="h-24 flex flex-col items-center justify-center"
              >
                <span className="text-lg">{action.title}</span>
                <ArrowRightOutlined className="mt-2" />
              </Button>
            </Col>
          ))}
        </Row>
      </Card>

      {/* Recent Activity */}
      <Card title="Recent Activity">
        <div className="text-gray-500 text-center py-4">
          No recent activity to display
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboardPage; 