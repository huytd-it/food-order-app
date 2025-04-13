import { useState, useEffect } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useAuth } from './useAuth';

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // Load cart from storage on initial render
  useEffect(() => {
    const loadCart = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log('Loading cart for user:', user?.uid || 'guest');

        if (user) {
          // Load from Firebase for logged-in users
          const cartRef = doc(db, 'carts', user.uid);
          const cartDoc = await getDoc(cartRef);
          console.log('Firebase cart document:', cartDoc.exists() ? cartDoc.data() : 'not found');

          if (cartDoc.exists()) {
            const items = cartDoc.data().items || [];
            console.log('Loaded items from Firebase:', items);
            setCartItems(items);
            setTotal(calculateTotal(items));
          } else {
            console.log('No cart found in Firebase, initializing empty cart');
            setCartItems([]);
            setTotal(0);
          }
        } else {
          // Load from localStorage for guest users
          const savedCart = localStorage.getItem('cart');
          console.log('LocalStorage cart:', savedCart);
          
          const items = savedCart ? JSON.parse(savedCart) : [];
          console.log('Loaded items from localStorage:', items);
          
          setCartItems(Array.isArray(items) ? items : []);
          setTotal(calculateTotal(items));
        }
      } catch (error) {
        console.error('Error loading cart:', error);
        setError(error.message);
        setCartItems([]);
        setTotal(0);
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, [user]);

  // Save cart to storage whenever it changes
  useEffect(() => {
    const saveCart = async () => {
      try {
        setError(null);
        console.log('Saving cart items:', cartItems);

        if (user) {
          // Save to Firebase for logged-in users
          const cartRef = doc(db, 'carts', user.uid);
          await setDoc(cartRef, { items: cartItems }, { merge: true });
          console.log('Saved to Firebase successfully');
        } else {
          // Save to localStorage for guest users
          localStorage.setItem('cart', JSON.stringify(cartItems));
          console.log('Saved to localStorage successfully');
        }
        setTotal(calculateTotal(cartItems));
      } catch (error) {
        console.error('Error saving cart:', error);
        setError(error.message);
      }
    };

    saveCart();
  }, [cartItems, user]);

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    console.log('Calculated total:', total);
    return total;
  };

  const addToCart = async (item) => {
    try {
      setError(null);
      console.log('Adding item to cart:', item);

      setCartItems(prevItems => {
        const existingItem = prevItems.find(i => i.id === item.id);
        if (existingItem) {
          const updatedItems = prevItems.map(i =>
            i.id === item.id 
              ? { ...i, quantity: i.quantity + (item.quantity || 1) } 
              : i
          );
          console.log('Updated existing item:', updatedItems);
          return updatedItems;
        }
        const newItems = [...prevItems, { ...item, quantity: item.quantity || 1 }];
        console.log('Added new item:', newItems);
        return newItems;
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      setError(error.message);
      throw error;
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      setError(null);
      console.log('Removing item from cart:', itemId);

      setCartItems(prevItems => {
        const newItems = prevItems.filter(item => item.id !== itemId);
        console.log('Items after removal:', newItems);
        return newItems;
      });
    } catch (error) {
      console.error('Error removing from cart:', error);
      setError(error.message);
      throw error;
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      setError(null);
      console.log('Updating quantity for item:', itemId, 'to:', quantity);

      if (quantity < 1) return;
      setCartItems(prevItems => {
        const newItems = prevItems.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        );
        console.log('Items after quantity update:', newItems);
        return newItems;
      });
    } catch (error) {
      console.error('Error updating quantity:', error);
      setError(error.message);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      setError(null);
      console.log('Clearing cart');

      setCartItems([]);
      setTotal(0);
    } catch (error) {
      console.error('Error clearing cart:', error);
      setError(error.message);
      throw error;
    }
  };

  return {
    cartItems: cartItems || [],
    total,
    isLoading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    itemCount: (cartItems || []).reduce((sum, item) => sum + (item.quantity || 0), 0)
  };
}; 