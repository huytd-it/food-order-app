import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Space, Typography, message } from 'antd';
import { setUsers, addUser, updateUser, deleteUser } from '../store/slices/userSlice';
import { addItem, removeItem, clearCart } from '../store/slices/cartSlice';

const { Title, Text } = Typography;

const TestRedux = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user?.users || []);
  const cart = useSelector((state) => state.cart?.items || []);
  const auth = useSelector((state) => state.auth);

  const handleAddUser = () => {
    const newUser = {
      id: Date.now().toString(),
      name: `Test User ${users.length + 1}`,
      email: `test${users.length + 1}@example.com`,
      role: 'user',
      status: 'active'
    };
    dispatch(addUser(newUser));
    message.success('User added to Redux store');
  };

  const handleUpdateUser = () => {
    if (users.length > 0) {
      const userToUpdate = users[0];
      dispatch(updateUser({
        ...userToUpdate,
        name: `Updated ${userToUpdate.name}`
      }));
      message.success('User updated in Redux store');
    }
  };

  const handleDeleteUser = () => {
    if (users.length > 0) {
      dispatch(deleteUser(users[0].id));
      message.success('User deleted from Redux store');
    }
  };

  const handleAddToCart = () => {
    const newItem = {
      id: Date.now().toString(),
      name: `Test Item ${cart.length + 1}`,
      price: 10.99,
      quantity: 1
    };
    dispatch(addItem(newItem));
    message.success('Item added to cart');
  };

  const handleRemoveFromCart = () => {
    if (cart.length > 0) {
      dispatch(removeItem(cart[0].id));
      message.success('Item removed from cart');
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    message.success('Cart cleared');
  };

  return (
    <div className="p-6">
      <Title level={2}>Redux Test Component</Title>
      
      <Space direction="vertical" size="large" className="w-full">
        {/* Auth State */}
        <Card title="Auth State">
          <Text>User: {auth?.user?.email || 'Not logged in'}</Text>
          <br />
          <Text>Role: {auth?.user?.role || 'No role'}</Text>
        </Card>

        {/* User State */}
        <Card title="User State">
          <Space direction="vertical" size="middle">
            <Text>Number of users: {users.length}</Text>
            <Space>
              <Button type="primary" onClick={handleAddUser}>
                Add Test User
              </Button>
              <Button onClick={handleUpdateUser}>
                Update First User
              </Button>
              <Button danger onClick={handleDeleteUser}>
                Delete First User
              </Button>
            </Space>
            <div className="max-h-40 overflow-y-auto">
              {users.map(user => (
                <div key={user.id} className="p-2 border-b">
                  <Text>{user.name} - {user.email}</Text>
                </div>
              ))}
            </div>
          </Space>
        </Card>

        {/* Cart State */}
        <Card title="Cart State">
          <Space direction="vertical" size="middle">
            <Text>Number of items: {cart.length}</Text>
            <Space>
              <Button type="primary" onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Button onClick={handleRemoveFromCart}>
                Remove First Item
              </Button>
              <Button danger onClick={handleClearCart}>
                Clear Cart
              </Button>
            </Space>
            <div className="max-h-40 overflow-y-auto">
              {cart.map(item => (
                <div key={item.id} className="p-2 border-b">
                  <Text>{item.name} - ${item.price} x {item.quantity}</Text>
                </div>
              ))}
            </div>
          </Space>
        </Card>
      </Space>
    </div>
  );
};

export default TestRedux; 