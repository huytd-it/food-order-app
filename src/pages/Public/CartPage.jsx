import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, clearCart, updateQuantity, updateItem } from '../../store/slices/cartSlice';
import { TrashIcon } from '@heroicons/react/24/outline';
import { sizeOptions, toppingOptions, badgeStyles } from '../../utils/constants';

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalAmount } = useSelector((state) => state.cart);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedToppings, setSelectedToppings] = useState({});

  // Load saved preferences from localStorage
  useEffect(() => {
    const savedPreferences = {};
    items.forEach(item => {
      const preferences = localStorage.getItem(`preferences_${item.id}`);
      if (preferences) {
        const { size, toppings } = JSON.parse(preferences);
        savedPreferences[item.id] = { size, toppings };
      }
    });
    setSelectedSizes(savedPreferences);
    setSelectedToppings(savedPreferences);
  }, [items]);

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));
    }
  };

  const handleSizeChange = (itemId, size) => {
    setSelectedSizes(prev => ({
      ...prev,
      [itemId]: { ...prev[itemId], size }
    }));
    
    // Calculate new total price
    const item = items.find(i => i.id === itemId);
    const sizePrice = sizeOptions.find(s => s.id === size)?.price || 0;
    const toppingsPrice = Object.entries(selectedToppings[itemId]?.toppings || {})
      .filter(([_, selected]) => selected)
      .reduce((total, [toppingId]) => {
        const topping = toppingOptions.find(t => t.id === toppingId);
        return total + (topping?.price || 0);
      }, 0);

    const totalPrice = item.price + sizePrice + toppingsPrice;

    dispatch(updateItem({
      id: itemId,
      size,
      totalPrice
    }));

    // Save to localStorage
    const preferences = {
      size,
      toppings: selectedToppings[itemId]?.toppings || {}
    };
    localStorage.setItem(`preferences_${itemId}`, JSON.stringify(preferences));
  };

  const handleToppingChange = (itemId, topping) => {
    setSelectedToppings(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        toppings: {
          ...prev[itemId]?.toppings,
          [topping]: !prev[itemId]?.toppings?.[topping]
        }
      }
    }));

    // Calculate new total price
    const item = items.find(i => i.id === itemId);
    const sizePrice = sizeOptions.find(s => s.id === selectedSizes[itemId]?.size)?.price || 0;
    const newToppings = {
      ...selectedToppings[itemId]?.toppings,
      [topping]: !selectedToppings[itemId]?.toppings?.[topping]
    };
    const toppingsPrice = Object.entries(newToppings)
      .filter(([_, selected]) => selected)
      .reduce((total, [toppingId]) => {
        const topping = toppingOptions.find(t => t.id === toppingId);
        return total + (topping?.price || 0);
      }, 0);

    const totalPrice = item.price + sizePrice + toppingsPrice;

    dispatch(updateItem({
      id: itemId,
      toppings: newToppings,
      totalPrice
    }));

    // Save to localStorage
    const preferences = {
      size: selectedSizes[itemId]?.size,
      toppings: newToppings
    };
    localStorage.setItem(`preferences_${itemId}`, JSON.stringify(preferences));
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Giỏ hàng của bạn đang trống</h1>
            <p className="mt-2 text-lg text-gray-600">
              Bạn chưa thêm sản phẩm nào vào giỏ hàng.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Giỏ hàng</h1>
            
            {/* Cart Items */}
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="border-b border-gray-200 pb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {/* Quantity Control */}
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="px-3 py-1 text-gray-600 hover:text-primary transition-colors duration-300"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-gray-900">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="px-3 py-1 text-gray-600 hover:text-primary transition-colors duration-300"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-lg font-semibold text-primary">
                        {(item.totalPrice * item.quantity).toLocaleString('vi-VN')}đ
                      </span>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-300"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Size Selection */}
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Kích thước</h4>
                    <div className="flex flex-wrap gap-2">
                      {sizeOptions.map((size) => (
                        <button
                          key={size.id}
                          onClick={() => handleSizeChange(item.id, size.id)}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                            selectedSizes[item.id]?.size === size.id
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {size.name} (+{size.price.toLocaleString('vi-VN')}đ)
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Toppings Selection */}
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Toppings</h4>
                    <div className="flex flex-wrap gap-2">
                      {toppingOptions.map((topping) => (
                        <button
                          key={topping.id}
                          onClick={() => handleToppingChange(item.id, topping.id)}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                            selectedToppings[item.id]?.toppings?.[topping.id]
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {topping.name} (+{topping.price.toLocaleString('vi-VN')}đ)
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Tổng số sản phẩm: {totalQuantity}</h3>
                  <p className="text-sm text-gray-500">Tổng tiền: {totalAmount.toLocaleString('vi-VN')}đ</p>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={handleClearCart}
                    className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors duration-300"
                  >
                    Xóa giỏ hàng
                  </button>
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-300">
                    Thanh toán
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 