import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../../store/slices/cartSlice';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { sizeOptions, toppingOptions, badgeStyles } from '../../utils/constants';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('medium');
  const [selectedToppings, setSelectedToppings] = useState({});
  const [hoveredTopping, setHoveredTopping] = useState(null);
  const buttonRef = useRef(null);

  // Load preferences from localStorage
  useEffect(() => {
    const savedPreferences = localStorage.getItem(`preferences_${product.id}`);
    if (savedPreferences) {
      const { size, toppings } = JSON.parse(savedPreferences);
      setSelectedSize(size);
      setSelectedToppings(toppings);
    }
  }, [product.id]);

  // Save preferences to localStorage
  const savePreferences = () => {
    localStorage.setItem(`preferences_${product.id}`, JSON.stringify({
      size: selectedSize,
      toppings: selectedToppings
    }));
  };

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
      document.body.appendChild(flyingElement);
      
      // Set initial position
      flyingElement.style.left = `${buttonRect.left + buttonRect.width / 2}px`;
      flyingElement.style.top = `${buttonRect.top + buttonRect.height / 2}px`;
      
      // Animate to cart
      setTimeout(() => {
        flyingElement.style.left = `${cartRect.left + cartRect.width / 2}px`;
        flyingElement.style.top = `${cartRect.top + cartRect.height / 2}px`;
        flyingElement.style.transform = 'scale(0)';
        flyingElement.style.opacity = '0';
      }, 10);
      
      // Remove element after animation
      setTimeout(() => {
        document.body.removeChild(flyingElement);
      }, 1000);
    }

    // Calculate total price with size and toppings
    const sizePrice = sizeOptions.find(size => size.id === selectedSize)?.price || 0;
    const toppingsPrice = Object.entries(selectedToppings)
      .filter(([_, selected]) => selected)
      .reduce((total, [toppingId]) => {
        const topping = toppingOptions.find(t => t.id === toppingId);
        return total + (topping?.price || 0);
      }, 0);

    const totalPrice = product.price + sizePrice + toppingsPrice;

    // Add to cart
    dispatch(addItem({
      ...product,
      quantity,
      size: selectedSize,
      toppings: selectedToppings,
      totalPrice
    }));

    // Save preferences
    savePreferences();

    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  const handleToppingChange = (toppingId) => {
    setSelectedToppings(prev => ({
      ...prev,
      [toppingId]: !prev[toppingId]
    }));
  };

  const handleSizeChange = (sizeId) => {
    setSelectedSize(sizeId);
    savePreferences();
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {product.isPopular && (
          <span className={`absolute top-2 left-2 text-xs font-semibold px-2 py-1 rounded-full ${badgeStyles.popular}`}>
            Popular
          </span>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-4">{product.description}</p>
        
        {/* Size Selection */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Size</h4>
          <div className="flex flex-wrap gap-2">
            {sizeOptions.map((size) => (
              <button
                key={size.id}
                onClick={() => handleSizeChange(size.id)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedSize === size.id
                    ? badgeStyles.selected
                    : badgeStyles.default
                }`}
              >
                {size.name} (+${size.price})
              </button>
            ))}
          </div>
        </div>

        {/* Toppings Selection */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Toppings</h4>
          <div className="flex flex-wrap gap-2">
            {toppingOptions.map((topping) => (
              <div key={topping.id} className="relative group">
                <button
                  onClick={() => handleToppingChange(topping.id)}
                  onMouseEnter={() => setHoveredTopping(topping.id)}
                  onMouseLeave={() => setHoveredTopping(null)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                    selectedToppings[topping.id]
                      ? badgeStyles.selected
                      : badgeStyles.default
                  }`}
                >
                  {topping.name} (+${topping.price})
                </button>
                {hoveredTopping === topping.id && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click to {selectedToppings[topping.id] ? 'remove' : 'add'} this topping
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="px-2 py-1 border rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              -
            </button>
            <span className="px-2 py-1">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="px-2 py-1 border rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              +
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-lg font-semibold text-primary">
              ${product.price.toFixed(2)}
            </span>
            <button
              ref={buttonRef}
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                isAdding
                  ? 'bg-green-500 text-white'
                  : 'bg-primary text-white hover:bg-primary-dark'
              }`}
            >
              {isAdding ? (
                <>
                  <ShoppingCartIcon className="h-5 w-5" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingCartIcon className="h-5 w-5" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .flying-element {
          position: fixed;
          width: 20px;
          height: 20px;
          background-color: #EF4444;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
};

export default ProductCard; 