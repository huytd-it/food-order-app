import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../../store/slices/cartSlice';
import { sizeOptions, toppingOptions } from '../../utils/constants';

const ProductCard = ({ product, sizeOptions, toppingOptions }) => {
  const dispatch = useDispatch();
  const buttonRef = useRef(null);
  const [isAdding, setIsAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0]);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    
    // Create flying element
    const button = buttonRef.current;
    const cartIcon = document.querySelector('.cart-icon');
    
    if (button && cartIcon) {
      const buttonRect = button.getBoundingClientRect();
      const cartRect = cartIcon.getBoundingClientRect();
      
      const flyingElement = document.createElement('div');
      flyingElement.className = 'flying-element';
      flyingElement.style.left = `${buttonRect.left + buttonRect.width / 2}px`;
      flyingElement.style.top = `${buttonRect.top + buttonRect.height / 2}px`;
      document.body.appendChild(flyingElement);
      
      // Animate
      setTimeout(() => {
        flyingElement.style.transform = `translate(${cartRect.left - buttonRect.left}px, ${cartRect.top - buttonRect.top}px)`;
        flyingElement.style.opacity = '0';
      }, 10);
      
      // Remove element after animation
      setTimeout(() => {
        document.body.removeChild(flyingElement);
        setIsAdding(false);
      }, 1000);
    }

    // Calculate total price
    const toppingsPrice = selectedToppings.reduce((total, topping) => total + topping.price, 0);
    const totalPrice = (product.price + selectedSize.price + toppingsPrice) * quantity;

    // Add to cart
    dispatch(addItem({
      ...product,
      size: selectedSize,
      toppings: selectedToppings,
      totalPrice,
      quantity
    }));
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleToppingChange = (topping) => {
    setSelectedToppings(prev => {
      const isSelected = prev.some(t => t.id === topping.id);
      if (isSelected) {
        return prev.filter(t => t.id !== topping.id);
      } else {
        return [...prev, topping];
      }
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {product.isPopular && (
          <div className="absolute top-2 right-2 bg-yellow-400 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Phổ biến
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
          <span className="text-lg font-bold text-primary">
            {product.price.toLocaleString('vi-VN')}đ
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="px-2 py-1 border rounded-lg hover:bg-gray-100"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="px-2 py-1 border rounded-lg hover:bg-gray-100"
            >
              +
            </button>
          </div>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-sm text-gray-500 hover:text-primary"
          >
            {showDetails ? 'Ẩn chi tiết' : 'Xem chi tiết'}
          </button>
        </div>

        {showDetails && (
          <div className="mt-4 pt-4 border-t">
            {/* Size Selection */}
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

            {/* Toppings Selection */}
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
          </div>
        )}

        <button
          ref={buttonRef}
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`w-full mt-4 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            isAdding
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-primary text-white hover:bg-primary-dark'
          }`}
        >
          {isAdding ? 'Đang thêm...' : 'Thêm vào giỏ'}
        </button>
      </div>

      <style jsx>{`
        .flying-element {
          position: fixed;
          width: 20px;
          height: 20px;
          background-color: #EF4444;
          border-radius: 50%;
          pointer-events: none;
          transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 9999;
        }
      `}</style>
    </div>
  );
};

export default ProductCard; 