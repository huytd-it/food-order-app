import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  foods: [],
  loading: false,
  error: null,
};

const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    setFoods: (state, action) => {
      state.foods = action.payload;
      state.error = null;
    },
    addFood: (state, action) => {
      state.foods.push(action.payload);
      state.error = null;
    },
    updateFood: (state, action) => {
      const index = state.foods.findIndex(food => food.id === action.payload.id);
      if (index !== -1) {
        state.foods[index] = action.payload;
      }
      state.error = null;
    },
    deleteFood: (state, action) => {
      state.foods = state.foods.filter(food => food.id !== action.payload);
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setFoods,
  addFood,
  updateFood,
  deleteFood,
  setLoading,
  setError,
} = foodSlice.actions;

export default foodSlice.reducer; 