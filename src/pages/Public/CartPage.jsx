import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeItem, clearCart, updateQuantity, updateItem } from '../../store/slices/cartSlice';
import { TrashIcon } from '@heroicons/react/24/outline';
import { sizeOptions, toppingOptions, badgeStyles } from '../../utils/constants';
import CartProduct from '../../components/Cart/CartProduct';

const CartPage = () => {
  const navigate = useNavigate();
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
    if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?')) {
      dispatch(clearCart());
    }
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

  const handleCheckout = () => {
    if (items.length === 0) {
      alert('Giỏ hàng của bạn đang trống!');
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Giỏ hàng của bạn đang trống</h1>
            <p className="text-lg text-gray-600 mb-8">
              Hãy thêm một số món ăn ngon vào giỏ hàng của bạn!
            </p>
            <button
              onClick={() => navigate('/menu')}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-300"
            >
              Xem thực đơn
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Giỏ hàng</h1>
            <button
              onClick={handleClearCart}
              className="text-red-500 hover:text-red-600 font-medium"
            >
              Xóa giỏ hàng
            </button>
          </div>

          <div className="space-y-4">
            {items.map((item) => (
              <CartProduct key={item.id} item={item} />
            ))}
          </div>

          <div className="mt-8 pt-6 border-t">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Tổng cộng</h3>
                <p className="text-sm text-gray-500">Đã bao gồm thuế và phí</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">
                  {totalAmount.toLocaleString('vi-VN')}đ
                </p>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full mt-6 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-300"
            >
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 