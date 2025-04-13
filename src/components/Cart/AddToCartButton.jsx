import React, { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

const AddToCartButton = ({ item }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    try {
      setIsAdding(true);
      await addToCart({ ...item, quantity });
      setQuantity(1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => Math.min(prev + 1, 10));
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center border rounded-full">
        <button
          onClick={decrementQuantity}
          className="p-1 text-gray-600 hover:text-primary"
          disabled={quantity <= 1}
        >
          <MinusIcon className="h-4 w-4" />
        </button>
        <span className="px-2 text-sm font-medium">{quantity}</span>
        <button
          onClick={incrementQuantity}
          className="p-1 text-gray-600 hover:text-primary"
          disabled={quantity >= 10}
        >
          <PlusIcon className="h-4 w-4" />
        </button>
      </div>
      <button
        onClick={handleAddToCart}
        disabled={isAdding}
        className={`flex-1 bg-primary text-white px-4 py-2 rounded-full text-sm hover:bg-primary-dark transition-colors duration-200 ${
          isAdding ? 'opacity-75 cursor-not-allowed' : ''
        }`}
      >
        {isAdding ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default AddToCartButton; 