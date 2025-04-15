import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, clearCart } from '../../store/slices/cartSlice';
import { ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline';

const Cart = () => {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalAmount } = useSelector(state => state.cart);

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (totalQuantity === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <ShoppingCartIcon className="h-12 w-12 text-gray-400" />
        <p className="mt-4 text-lg text-gray-500">Giỏ hàng trống</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Giỏ hàng ({totalQuantity})</h2>
        <button
          onClick={handleClearCart}
          className="text-red-500 hover:text-red-700"
        >
          Xóa tất cả
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-gray-500">{item.price.toLocaleString('vi-VN')}đ</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-gray-700">x{item.quantity}</span>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-white rounded-lg shadow">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Tổng cộng:</span>
          <span className="text-lg font-bold">
            {totalAmount.toLocaleString('vi-VN')}đ
          </span>
        </div>
      </div>
    </div>
  );
};

export default Cart; 