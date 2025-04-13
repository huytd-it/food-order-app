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
      // Ensure we're passing all necessary item properties
      const cartItem = {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        description: item.description,
        category: item.category,
        quantity: quantity
      };
      await addToCart(cartItem);
      // Reset quantity after successful add
      setQuantity(1);
    } catch (error) {
      console.error('Error adding to cart:', error);
      // You might want to show a toast notification here
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
      <div className="flex items-center border rounded-md">
        <button
          onClick={decrementQuantity}
          className="p-1 text-gray-600 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={quantity <= 1}
        >
          <MinusIcon className="h-4 w-4" />
        </button>
        <span className="px-2 text-sm font-medium">{quantity}</span>
        <button
          onClick={incrementQuantity}
          className="p-1 text-gray-600 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={quantity >= 10}
        >
          <PlusIcon className="h-4 w-4" />
        </button>
      </div>
      <button
        onClick={handleAddToCart}
        disabled={isAdding}
        className={`px-3 py-1 text-sm font-medium rounded-md ${
          isAdding
            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
            : 'bg-primary text-white hover:bg-primary-dark'
        }`}
      >
        {isAdding ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default AddToCartButton; 