import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeItem, updateQuantity, updateItem } from '../../store/slices/cartSlice';
import { sizeOptions, toppingOptions } from '../../utils/constants';

const CartProduct = ({ item }) => {
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(false);
  const [selectedSize, setSelectedSize] = useState(item.size || sizeOptions[0]);
  const [selectedToppings, setSelectedToppings] = useState(item.toppings || []);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0) {
      const toppingsPrice = selectedToppings.reduce((total, topping) => total + topping.price, 0);
      const totalPrice = (item.price + selectedSize.price + toppingsPrice) * newQuantity;
      
      dispatch(updateItem({
        id: item.id,
        quantity: newQuantity,
        size: selectedSize,
        toppings: selectedToppings,
        totalPrice
      }));
    }
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    const toppingsPrice = selectedToppings.reduce((total, topping) => total + topping.price, 0);
    const totalPrice = (item.price + size.price + toppingsPrice) * item.quantity;
    
    dispatch(updateItem({
      id: item.id,
      size,
      toppings: selectedToppings,
      totalPrice
    }));
  };

  const handleToppingChange = (topping) => {
    const newToppings = selectedToppings.some(t => t.id === topping.id)
      ? selectedToppings.filter(t => t.id !== topping.id)
      : [...selectedToppings, topping];
    
    setSelectedToppings(newToppings);
    const toppingsPrice = newToppings.reduce((total, topping) => total + topping.price, 0);
    const totalPrice = (item.price + selectedSize.price + toppingsPrice) * item.quantity;
    
    dispatch(updateItem({
      id: item.id,
      size: selectedSize,
      toppings: newToppings,
      totalPrice
    }));
  };

  const handleRemove = () => {
    dispatch(removeItem(item.id));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">{item.name}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-sm text-gray-500">
                {selectedSize.name} {selectedSize.price > 0 ? `(+${selectedSize.price.toLocaleString('vi-VN')}đ)` : ''}
              </span>
              {selectedToppings.length > 0 && (
                <span className="text-sm text-gray-500">
                  +{selectedToppings.length} topping
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <button
                onClick={() => handleQuantityChange(item.quantity - 1)}
                className="px-2 py-1 border rounded-lg hover:bg-gray-100"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item.quantity + 1)}
                className="px-2 py-1 border rounded-lg hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="font-semibold text-primary">
            {item.totalPrice.toLocaleString('vi-VN')}đ
          </span>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-sm text-gray-500 hover:text-primary mt-2"
          >
            {showDetails ? 'Ẩn chi tiết' : 'Xem chi tiết'}
          </button>
        </div>
      </div>

      {showDetails && (
        <div className="mt-4 pt-4 border-t">
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Kích thước</h4>
            <div className="flex gap-2">
              {sizeOptions.map(size => (
                <button
                  key={size.id}
                  onClick={() => handleSizeChange(size)}
                  className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                    selectedSize.id === size.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {size.name} {size.price > 0 ? `(+${size.price.toLocaleString('vi-VN')}đ)` : ''}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Thêm vào</h4>
            <div className="flex flex-wrap gap-2">
              {toppingOptions.map(topping => (
                <button
                  key={topping.id}
                  onClick={() => handleToppingChange(topping)}
                  className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                    selectedToppings.some(t => t.id === topping.id)
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {topping.name} (+{topping.price.toLocaleString('vi-VN')}đ)
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleRemove}
            className="text-red-500 hover:text-red-600 text-sm font-medium"
          >
            Xóa khỏi giỏ hàng
          </button>
        </div>
      )}
    </div>
  );
};

export default CartProduct; 