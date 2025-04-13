import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Margherita Pizza',
      price: 12.99,
      quantity: 1,
      image: '/images/margherita.jpg'
    },
    {
      id: 2,
      name: 'Chicken Burger',
      price: 9.99,
      quantity: 2,
      image: '/images/chicken-burger.jpg'
    }
  ]);

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
          <Link to="/menu" className="text-primary hover:text-opacity-80">
            Browse our menu
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {cartItems.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-6 mb-4">
                <div className="flex items-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-md mr-4">
                    {/* Placeholder for image */}
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      Image
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <p className="text-primary font-bold">${item.price}</p>
                    <div className="flex items-center mt-2">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 border rounded-l"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 border-t border-b">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 border rounded-r"
                      >
                        +
                      </button>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="ml-4 text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%)</span>
                  <span>${(total * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${(total * 1.1).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <Link 
                to="/checkout"
                className="block w-full bg-primary text-white text-center py-3 rounded-md hover:bg-opacity-90"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage; 