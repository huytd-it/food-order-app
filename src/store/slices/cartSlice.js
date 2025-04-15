import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.totalQuantity += action.payload.quantity;
      state.totalAmount += action.payload.totalPrice * action.payload.quantity;
    },
    removeItem: (state, action) => {
      const itemToRemove = state.items.find(item => item.id === action.payload);
      if (itemToRemove) {
        state.totalQuantity -= itemToRemove.quantity;
        state.totalAmount -= itemToRemove.totalPrice * itemToRemove.quantity;
        state.items = state.items.filter(item => item.id !== action.payload);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        const oldQuantity = item.quantity;
        item.quantity = quantity;
        state.totalQuantity += quantity - oldQuantity;
        state.totalAmount += item.totalPrice * (quantity - oldQuantity);
      }
    },
    updateItem: (state, action) => {
      const { id, size, toppings, totalPrice } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        if (size) item.size = size;
        if (toppings) item.toppings = toppings;
        if (totalPrice) {
          const oldTotalPrice = item.totalPrice;
          item.totalPrice = totalPrice;
          state.totalAmount += (totalPrice - oldTotalPrice) * item.quantity;
        }
      }
    }
  },
});

export const { addItem, removeItem, clearCart, updateQuantity, updateItem } = cartSlice.actions;
export default cartSlice.reducer; 
